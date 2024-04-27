const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailsender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// ! capture the payment and initate the rozarpay order
exports.capturePayment = async (req, res) => {
  // get courseID and userID
  const { course_id } = req.body;
  const userId = req.user.id;
  // vaildation

  // vaild courseID
  if (!course_id) {
    return res.json({
      success: false,
      message: "please fill all deatils carefully",
    });
  }
  // valid courseDetails
  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.json({
        success: false,
        message: "could not find the course",
      });
    }
    // user already pay the same course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "user already enrolled in this course",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // order create
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      course_id: course_id,
      userId,
    },
  };

  try {
    // initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log("payment response", paymentResponse);
    // return response
    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // return respone
};

// !Verify Signature of Razorpay and server

exports.veriftsignature = async (req, res) => {
  const webhookSecret = "12345678";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature !== digest) {
    console.log("payment is Authorized");

    const { userId, courseId } = req.body.payload.payment.entity.notes;

    try {
      // fulfill the action

      //find course and enrool the student in it .
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course Not Found",
        });
      }
      console.log(enrolledCourse);
      // find the student added to course jisme vo hai
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(enrolledStudent);

      // ! (mail send golu ko)
      const emailResponse = await mailsender(
        enrolledStudent.email,
        "congratulation from vectorCode",
        "Congratulation ! Golu yor successfully  in VectorCode Course"
      );
      console.log("Email sent successfully:", emailResponse);
      return response.status(200).json({
        success: true,
        message: "payment is Authorized",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error in payment request ",
      });
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "payment is not Authorized",
    });
  }

};
