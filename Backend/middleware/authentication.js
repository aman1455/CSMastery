const jwt = require('jsonwebtoken');
const customError = require('../errors');
//const {StatusCodes} = require('http-status-codes');

const {isTokenValid} = require('../utils');


const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new customError.UnauthenticatedError("Authentication failed: token not found");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
   console.log("after token",payload);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };

    next();
  } catch (error) {
    throw new customError.UnauthenticatedError("Authentication failed: invalid or expired token");
  }
};

const authorizePermissions = (req,res,next)=> {
    if(req.user.role!== 'admin'){
        throw new customError.UnauthorizedError('Unauthorized to access this route');
    }
    next();
}
 
module.exports = {
    authenticateUser,
    authorizePermissions
}