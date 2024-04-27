const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
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
    const mainResponse = await mailSender(
      email,
      "Verification Email from VectorStudy",
      emailTemplate(otp)

    );
    console.log("Email send sccessfully: ", mainResponse);
  } catch (err) {
    console.log("error sending verification", err);
    throw err;
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);
