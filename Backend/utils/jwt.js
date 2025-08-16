const jwt = require('jsonwebtoken');

const createJWT = ({payload}) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME });
    return token;
}

const isTokenValid = ({token})=> jwt.verify(token,process.env.JWT_SECRET);

const attachCookiesToResponse = ({res,refreshToken}) => {
    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 15 * 24 * 60 * 60 * 1000, 
  });
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }); 
};

const createRefreshToken = (payload) => {

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "15d" }); 
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports= {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createAccessToken,
    createRefreshToken,
    verifyToken
};