// Import required modules
const express = require("express");
const router = express.Router();

// Import constrollers and middlewares

const {
  signUp,
  login,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/ResetPassword");

const { auth } = require("../controllers/Auth");
const { sign } = require("jsonwebtoken");

//! Routes for login signup and auth

//----------------------------Authentication Route ----------------

//Login
router.post("/login", login);
//Signup
router.post("/signup", signUp);
// route for sending otp to user
router.post("/sendotp", sendOTP);
// change Password
router.post("/changePassword", changePassword);

//------------------------Reset Passwords-------------------

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);


module.exports = router;
