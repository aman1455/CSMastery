const User = require('../model/User');
const {StatusCodes}= require('http-status-codes');
const customError = require('../errors');
const jwt = require('jsonwebtoken');
const {attachCookiesToResponse} = require('../utils');
const { token } = require('morgan');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

const register = async (req,res) => {
    const {email,name,password} = req.body;
    // Checking if the email is already used or not
    const emailAlreadyExists =await User.findOne({email});
    if(emailAlreadyExists){
        throw new customError.BadRequestError('Email is already in use')
    }

    //Creating user by providing name,email and password so that if any user provides the role as admin...it will be denied
    const user = await User.create({name,email,password});
    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res,user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req,res) => {
    const {email , password} = req.body;

    if(!email || !password){
        throw new customError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new customError.UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new customError.UnauthenticatedError('Invalid credentials'); 
    }

    const tokenUser = {name: user.name, userId: user._id, role: user.role};
     const accessToken = createAccessToken(tokenUser);
  const refreshToken = createRefreshToken(tokenUser);

   res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
  });
    res.status(StatusCodes.CREATED).json({user: tokenUser,accessToken});
}
// const logout = async (req,res) => {
//     res.cookie('token','logout',{
//         httpOnly: true,
//         expires: new Date(Date.now()),
//     });
//     res.send('user logged out');
// }

const logout = async (req, res) => {
    // Clear the logout cookie
    res.clearCookie('refreshToken');

    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    
    // Send a response indicating successful logout
    res.send('User logged out');
}

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = createAccessToken({
      name: decoded.name,
      userId: decoded.userId,
      role: decoded.role
    });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: `Invalid refresh token ` });
  }
};

module.exports = {
    logout,
};


module.exports = {
    register,
    login,
    logout,
    refreshAccessToken
}