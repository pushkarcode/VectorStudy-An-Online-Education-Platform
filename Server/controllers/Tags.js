const Tag = require("../models/Tags");

// create a new tag handler function
exports.createTag = async (req, res) => {
  try {
    //get the tag data
    const { name, description } = req.body;
    //vaildation
    if (!name || !description) {
      return res.status(403).json({
        success: false,
        message: "please fill all deatils carefully",
      });
    }
    // ? create sa entry on DB and Save that File

    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
    console.log(tagDetails);
    //return response

    return res.status(200).json({
      success: true,
      message: "Tag created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};

//getALl tags handler function
exports.showAlltags = async (req, res) => {
  try {
    const allTages = await Tag.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All Tages return successful",
      allTages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong, please try again",
    });
  }
};
