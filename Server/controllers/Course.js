const User = require("../models/User");
const Course = require("../models/Course");
const uploadImageToCloudinary = require("../utils/imageUploader");
const Category = require("../models/Category");

// createCourse handler function

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      instructions,
      status,
    } = req.body;
    const userId = req.user.id;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !thumbnail ||
      !tag ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        mesage: "please fill all deatils carefully",
      });
    }
    if (!status || status === undefined) {
			status = "Draft";
		}

    // !check for instructer (something fishy)
    const instructorDetails = await User.findById({ userId });
    console.log("Instructer Details: ", instructorDetails);

    if (!instructorDetails) {
      return rs.staus(200).json({
        success: false,
        mesage: "Instructor deatils not found",
      });
    }

    //check given tag is vaild or not
    const categoryDetilas = await Category.findById(category);
    if (!categoryDetilas) {
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
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetilas._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//getAllCourse handler function
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnroled: true,
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

// getCourse details
exports.getAllCourseDetails = async (req, res) => {
  try {
    // data fetch
    const { courseId } = req.body;
    // find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // vaidation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        meddage: `Could not find the course with ${courseId}`,
      });
    }

    // return res
    return res.status(200).json({
      success: true,
      message: "course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};
