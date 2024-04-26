// Import require modules
const express = require('express');
const router = express.Router();

// Import Controllesr

const {createCourse, getAllCourseDetails, getAllCourses} = require('../controllers/Course')
const {createsection, updatesection, deleteSection} = require('../controllers/Section')
const {createSubsection, updatedSubsetion, deleteSubsection} = require('../controllers/Subsection')
const {createCategory, showAllCategorys, getcategoryPageDetails} = require('../controllers/Category')
const {createRating,getAverageRating, getAllRating} = require('../controllers/RatingAndReview')




//! Importing All Midlewares

const {auth, isAdmin, isInstructor, isStudent } = require('../middlewares/auth');

// ?------------------------------COURSE > ROUTES-------------------!

// course can be created by instructer
router.post('/createCourse',auth,isInstructor, createCourse);
// Get all courses
router.get('/getAllCourses', getAllCourses);
// get details of specific course
router.post('/getCourseDetails', getAllCourseDetails); // * doubut in that.

//---------section Add to the course---------
router.post('/addSection',auth,isInstructor, createsection);
//---------update section -------------------
router.post('/updateSection',auth,isInstructor, updatesection);
//---------delete section -------------------
router.post('/deleteSection',auth,isInstructor, deleteSection);

//Add a new sub section to the coursde
router.post('/addSubSection',auth,isInstructor,createSubsection);
//update a sub section
router.post('./updateSubSection',auth,isInstructor,updatedSubsetion);
//delete a sub section
router.post('./deleteSubSection',auth,isInstructor,deleteSubsection);


//! ----------------------- Category Routes only(by Admin)--------------

router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/showAllCategories',showAllCategorys);
router.post('/getCategoryPageDetails',getcategoryPageDetails);



//!------------------------ Rating and Review --------------------------

router.post('/createRating',createRating);
router.get('/getAverageRating', getAverageRating);
router.get('/getAllReview', getAllRating);


module.exports = router;

