const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  // Validate courses input
  if (!Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ success: false, message: "Please provide Course ID(s)." });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    try {
      // Find the course by its ID
      const course = await Course.findById(course_id);

      // If the course is not found, return an error
      if (!course) {
        return res.status(404).json({ success: false, message: `Course with ID ${course_id} not found.` });
      }

      // Check if the user is already enrolled in the course
      if (course?.studentsEnroled?.includes(userId)) {
        return res.status(400).json({ success: false, message: "Student is already enrolled in this course." });
      }

      // Add the price of the course to the total amount
      total_amount += course.price;
    } catch (error) {
      console.error("Error fetching course:", error);
      return res.status(500).json({ success: false, message: "An error occurred while processing the courses." });
    }
  }

  // Prepare Razorpay order options
  const options = {
    amount: total_amount * 100, // Convert to smallest currency unit
    currency: "INR",
    receipt: `receipt_${Math.random().toString(36).substring(2, 15)}`, // Generate a unique receipt ID
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    return res.json({ success: true, data: paymentResponse });
  } catch (error) {
    console.error("Error initiating order:", error);
    return res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};

// Verify the payment
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id;

  // Validate payment details
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !Array.isArray(courses) || !userId) {
    return res.status(400).json({ success: false, message: "Payment verification failed due to missing details." });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      await enrollStudents(courses, userId);
      return res.status(200).json({ success: true, message: "Payment verified successfully." });
    } catch (error) {
      console.error("Error enrolling students:", error);
      return res.status(500).json({ success: false, message: "Payment verified but failed to enroll students." });
    }
  }

  return res.status(400).json({ success: false, message: "Payment verification failed." });
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  // Validate email parameters
  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: "Please provide all the details." });
  }

  try {
    const enrolledStudent = await User.findById(userId);
    if (!enrolledStudent) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    return res.status(200).json({ success: true, message: "Payment success email sent." });
  } catch (error) {
    console.error("Error in sending mail:", error);
    return res.status(500).json({ success: false, message: "Could not send email." });
  }
};

// Enroll the student in the courses
const enrollStudents = async (courses, userId) => {
  if (!Array.isArray(courses) || !userId) {
    throw new Error("Please provide course IDs and user ID.");
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { studentsEnrolled: userId } }, // Use $addToSet to avoid duplicates
        { new: true }
      );

      if (!enrolledCourse) {
        throw new Error(`Course with ID ${courseId} not found.`);
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      // Send email notification to the enrolled student
      await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Successfully enrolled student and sent email notification.");
    } catch (error) {
      console.error("Error enrolling student:", error);
      throw new Error(error.message);
    }
  }
};
