const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();
const uuid = require('uuid');
// Generate a unique token
const token = uuid.v4();


// ? sign up
exports.signUp = async (req, res) => {
  try {
    // data fatch from re.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // ! validation karlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        mesage: "please fill all deatils carefully",
      });
    }

    // ! 2 password match karo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "password and confirmpassword value does not match ! please try again",
      });
    }

    // ! check user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // ! find most recent otp in db
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      // recent otp
    console.log(recentOtp);

    //Validate otp
    if (recentOtp.length == 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      //Invaild otp
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

   // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

    //entry created in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
			approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      token: token,
    });

    //return res

    return res.status(200).json({
      success: true,
      user,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered. please try agian",
    });
  }
};

// * login
exports.login = async (req, res) => {
  try {
    //get data from req.body
    const { email, password } = req.body;
    //vaidation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        mesage: "please fill all deatils carefully",
      });
    }
    // user exist or not
    const user = await User.findOne({ email }).populate("additionalDetails"); // ! why this
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registerd",
      });
    }
    //genrate jwt token after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;
      //create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "login succesfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "invalid password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

// !Send otp to email
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req ki body
    const { email } = req.body;

    //check if user already exist
    const checkUserPresent = await User.findOne({ email });

    // ! if user already exist, then retuen a response check vaildation
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    // * generate otp and check in DB
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP fenrated: ", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otppayload = { email, otp };
    //create an entry for otp
    const otpBody = await OTP.create(otppayload);
    console.log("OTP Body", otpBody);

    // return response succesfully
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  try {
    //get data from req.body
    const userDetails = await User.findById(req.user.id);
    //get oldPassword, newPassword, confirmNewPassord
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    //vaidation
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }
    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }
    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    //send Main - password updated

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
