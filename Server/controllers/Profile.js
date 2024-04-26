const Profile = require("../models/Profile");
const User = require("../models/User");

// ! update profile
exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    // get userId
    const id = req.user.id;
    // vaildation
    if (!contactNumber || !gender || !id) {
      return res.status(403).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    // find Profile
    const userDetails = await User.findById(id);
    const profileid = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileid);
    // update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    //    return res
    return res.status(200).json({
      success: true,
      message: "profile updated",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update profile, please try again" + error.message,
    });
  }
};

// delete account

exports.deleteAccount = async (req, res) => {
  try {
    // get Id
    const id = req.user.id;
    // vaildation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    // delete Profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //TODO uneroll user from all enrooled couses

    // delete user
    await User.findByIdAndDelete({ _id: id });
    // return res
    return res.status(200).json({
      success: true,
      message: "account deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete account, please try again" + error.message,
    });
  }
};

//* get allinfo of user
exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;
    //validation & get user data
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: "user details fetched",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch user details, please try again" + error.message,
    });
  }
};


// ! update progile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

//! getenrooled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};