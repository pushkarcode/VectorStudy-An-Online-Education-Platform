const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create a sub-section
exports.createSubsection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, timeDuration, description } = req.body;
    // extract file/video
    const video = req.files.videoFile;
    // validation
    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(404).json({
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
    ).populate("subSection");
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
    const { title, sectionId, description } = req.body;
    const subSection = await SubSection.findById(sectionId);
    // validation
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }
    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }
    await subSection.save();
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
    const { subsectionId, sectionId } = req.params;
    if (!subsectionId == !sectionId) {
      return res.status(404).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    // validation
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subsectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete subsection, please try again",
    });
  }
};
