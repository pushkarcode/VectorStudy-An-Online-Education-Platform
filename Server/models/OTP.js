const mongoose = require("mongoose");
const mailsender = require("mailsender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires:60 * 5,
  },
});
// ! Something cokking golu (mail send)



async function sendVerificationEmail(email, otp) {
  try {
    const mainResponse = await mailsender(
      email,
      "Verification Email from VectorStudy",
      otp
    );
    console.log("Email send sccessfully: ", mainResponse);
  } catch (err) {
    console.log("error sending verification", err);
    throw err;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, thsi.otp);
  next();
});

module.exports = mongoose.modelNames("OTP", OTPSchema);
