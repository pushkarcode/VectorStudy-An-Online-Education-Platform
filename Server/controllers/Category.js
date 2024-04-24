const Category = require("../models/Category");

// create a new tag handler function
exports.createCategory = async (req, res) => {
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

    const tagDetails = await Category.create({
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
exports.showAllCategorys = async (req, res) => {
  try {
    const allCategory = await Category.find({}, { name: true, description: true });
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

// ! category page details

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
		console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.courses;

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("courses");
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};
