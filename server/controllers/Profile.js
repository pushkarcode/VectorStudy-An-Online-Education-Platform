const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;
    const id = req.user.id;

    // Find the user and profile by id
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const profile = await Profile.findById(userDetails.additionalDetails);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Update the user and profile fields
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    await userDetails.save();

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    // Save the updated profile
    await profile.save();

    // Find the updated user details with populated fields
    const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete account method
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Delete associated Profile with the User
    await Profile.findByIdAndDelete(user.additionalDetails);

    // Remove user from courses
    await Course.updateMany(
      { studentsEnroled: id },
      { $pull: { studentsEnroled: id } }
    );

    // Now delete User
    await User.findByIdAndDelete(id);
    await CourseProgress.deleteMany({ userId: id });

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "User cannot be deleted successfully" });
  }
};

// Get all user details method
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update display picture method
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files?.displayPicture;
    if (!displayPicture) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    const userId = req.user.id;
    const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
    console.log(image);

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    res.send({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get enrolled courses method
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findById(userId).populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    }).exec();

    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    userDetails = userDetails.toObject();
    for (const course of userDetails.courses) {
      let totalDurationInSeconds = 0;
      let subsectionLength = 0;

      for (const content of course.courseContent) {
        totalDurationInSeconds += content.subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration || 0), 0);
        subsectionLength += content.subSection.length;
      }

      course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

      const courseProgressCount = await CourseProgress.findOne({
        courseID: course._id,
        userId: userId,
      });
      
      const completedVideosCount = courseProgressCount?.completedVideos.length || 0;

      if (subsectionLength === 0) {
        course.progressPercentage = 100;
      } else {
        // To make it up to 2 decimal points
        const multiplier = Math.pow(10, 2);
        course.progressPercentage = Math.round((completedVideosCount / subsectionLength) * 100 * multiplier) / multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Instructor dashboard method
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled?.length || 0;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
