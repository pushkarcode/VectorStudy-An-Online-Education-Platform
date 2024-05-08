const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// !resetPassword token
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const email = req.body.email;
    // check validation on email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "you're email not registerwed with us !",
      });
    }
    //Genrate token
    const token = crypto.randomBytes(20).toString("hex");
    // update user by adding token and expriration time
    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 3600000 },
      { new: true }
    );
    console.log("DETAILS", updateDetails)

    // create url
    const url = `http://localhost:3000/update-password/${token}`;
    // send mail containg the url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    )

    //return response
    return res.status(200).json({
      success: true,
      message: "password reset link has been sent to your email !",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

// !reset otp functionaity added
exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.status(200).json({
        success: false,
        message: "password and confirm password do not match",
      });
    }
    // get user details from the database using token
    const userDetails = await User.findOne({ token: token });
    // if no entry - invalid token
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    }
    // token time check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(200).json({
        success: false,
        message: "token has expired",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error("Error hashing password");
    }
    // password update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "password has been updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

