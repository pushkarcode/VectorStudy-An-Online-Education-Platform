const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// !signup otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req ki body
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        mesage: "please fill all deatils carefully",
      });
    }

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

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otppayload = { email, otp };
    //create an entry for otp
    const otpBody = await OTP.create(otppayload);
    console.log(otpBody);

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
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1); // recent otp
    console.log(recentOtp);

    //Validate otp
    if (recentOtp.length == 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp) {
      //Invaild otp
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //entry created in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      avout: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additionalDetails: profileDetails,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //return res

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
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
        role: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      //create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 34 * 60 * 60 * 1000),
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

//changePassword
exports.changePassword = async (req, res) => {
  //get data from req.body

  //get oldPassword, newPassword, confirmNewPassord
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  //vaidation
  if(!oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(403).json({
      success: false,
      mesage: "please fill all deatils carefully",
    });
  }
  // i thinl one valitdation more
  // update in DB
    
  //send Main - password updated
  //return res
};
