const User = require("../models/User");
const Tag = require("../models/Tag");
const Course = require("../models/Course");
const uploadImageToCloudinary = require("../utils/imageUploader");

// createCourse handler function

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseNmae, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseNmae ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !thumbnail ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        mesage: "please fill all deatils carefully",
      });
    }

    // !check for instructer (something fishy)
    const userId = req.user.id;
    const instructorDetails = await User.findById({ userId });
    console.log("Instructer Details: ", instructorDetails);

    if (!instructorDetails) {
      return rs.staus(200).json({
        success: false,
        mesage: "Instructor deatils not found",
      });
    }

    //check given tag is vaild or not
    const tagDetilas = await Tag.findById(tag);
    if (!tagDetilas) {
      return rs.staus(200).json({
        success: false,
        mesage: "tag deatils not found",
      });
    }

    // upload image to cludeinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetilas._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add the new course to the user schema of instructer
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update tag schema
    //return response

    return res.status(200).json({
      success: true,
      message: "course created succesfully",
      data: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mesage: "something went wrong, please try again",
    });
  }
};

//getAllCourse handler function
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).josn({
      success: true,
      message: "Datafor all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      mesage: "something went wrong, please try again",
    });
  }
};
