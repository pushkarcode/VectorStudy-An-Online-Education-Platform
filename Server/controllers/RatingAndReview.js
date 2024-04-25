const { RatingAndReview } = require("../models/RatingAndReview");
const Course = require("../models/Course");

//! create Rating
exports.createRating = async (req, res) => {
  try {
    //get uder id
    const { userId } = req.user.body;
    //fetchdata from re body
    const { rating, review, courseId } = req.body;
    //check if usern enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $eleMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // check if user already review the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }
    //create rating and revire
    const ratingReview = await RatingAndReview.create({
      rating: review,
      course: courseId,
      user: userId,
    });
    //update course with rating&review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReview: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);
    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

//! getAverage Rating
exports.getAverageRating = async (req, res) => {
  try {
    // get Course Id
    const { courseId } = req.body;
    // calculated avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // retun rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Average Rating",
        averageRating: result[0].averageRating,
      });
    }

    // if no rating.review  exist
    return res.status(200).json({
      success: true,
      message: "Average Rating not found",
      averageRating: 0,
    });
    
   

  }
   catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

//! getAllRating

exports.getAllRating = async (req, res) => {
    try {
       // get data
      const allReviews = await RatingAndReview.find({})
                          .sort({rating: "desc"})
                          .populate({
                            path: "user",
                            select: "firstName lastName email image",
                          })
                          .populate({
                            path: "course",
                            select: "courseName",
                          })
                          .exex();
        return res.status(200).json({
            success: true,
            message: "all rating fetched",
            data:allReviews,
        })
                                  
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to fetch rating data, please try again",
        });
        
    }
}