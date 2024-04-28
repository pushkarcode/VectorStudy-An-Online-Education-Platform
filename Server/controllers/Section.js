const Section = require("../models/Section");
const Course = require("../models/Course");

// ! create section
exports.createsection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data vaildation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    // create section
    const newSection = await Section.create({ sectionName });
    console.log(newSection);
    // update course with section ObjectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ) 
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
      // console.log(updatedCourseDetails)

    // return

    return res.status(200).json({
      success: true,
      message: "section created succesfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create section, please try again " + error.message,
    });
  }
};

// ! update section
exports.updatesection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, sectionId } = req.body;
    // data vaildation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    //update section
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    // retutn res
    return res.status(200).json({
      success: true,
      message: "section updated succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to update section, please try again",
    });
  }
};

// ! delete section
exports.deleteSection = async (req, res) => {
  try {
    // get ID
    const { sectionId } = req.body;
    // use findByIdandDelete
    await Section.findByIdAndDelete(sectionId);
    // TODO[TESTING]: Do we need to delete the entry from course schema
    return res.status(200).json({
      success: true,
      message: "section deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, please try again",
    });
  }
};
