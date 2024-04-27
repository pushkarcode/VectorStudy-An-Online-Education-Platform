// Import required modules
const express = require("express");
const router = express.Router();

//! Importing All Midlewares
const { auth } = require("../middlewares/auth");

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile");

//! ------------------------------> PROFLE ROIUTES <---------------

router.delete("/deleteProfile", deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// get enrolled
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture)


module.exports = router;