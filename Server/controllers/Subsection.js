const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

// create a sub-section
exports.createSubsection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, timeDuration, description } = req.body;
    // extract file/video
    const video = req.files.videoFile;
    // validation
    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(403).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    // uplaod video to cludenay
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // create sub-section
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    // Upadet section with sun section OnjectID
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    );
    // ! hw populate the deatils
    // return res
    return res.status(200).json({
      success: true,
      message: "subsection created succesfully",
      updatedSection,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to create subsection, please try again",
    });
  }
};

// update a subsection
exports.updatedSubsetion = async (req, res) => {
  try {
    // get the data
    const { title, timeDuration, description } = req.body;
    // validation
    if (!title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    //update subsection
    const subsection = await SubSection.findByIdAndUpdate(
      sectionId,
      {
        title: title,
        timeDuration: timeDuration,
        description: description,
      },
      { new: true }
    );
    // return res
    return res.status(200).json({
      success: true,
      message: "subsection updated succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update subsection, please try again",
    });
  }
};

// delete a subsection
exports.deleteSubsection = async (req, res) => {
  try {
    // get the id
    const { subsectionId } = req.params;
    // validation
    await SubSection.findByIdAndDelete(subsectionId);
    return res.status(200).json({
      success: true,
      message: "subsection deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete subsection, please try again",
    });
  }
};
