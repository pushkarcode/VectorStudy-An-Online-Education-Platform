const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        mesage: "Token is Missing Golu",
      });
    }
    // Verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;  // ! golu
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token.",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for student only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "User can not be verified Please try again later.",
    });
  }
};

//isInstructer
exports.isInstructor = async (req, res, next) => {
    try {
      if (req.user.accountType !== "Instructor") {
        return res.status(401).json({
          success: false,
          message: "This is a protected route for Instructor only",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        success: false,
        message: "User can not be verified Please try again later.",
      });
    }
  };
     

//IsAdmin

exports.isAdmin = async (req, res, next) => {
    try {
      if (req.user.accountType !== "Admin") {
        return res.status(401).json({
          success: false,
          message: "This is a protected route for Admin only",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        success: false,
        message: "User can not be verified Please try again later.",
      });
    }
  };
