const SubCategory = require("../Models/SubCategory");
const Category = require("../Models/Category");

createsubCategory = async(req, res) => {
    try {
	const subcategory = new SubCategory(req.body);
	// await subcategory.save();
	//     await Category.findByIdAndUpdate(req.body.category, {
	// $push: { subcategories: subcategory },
	//  });
	res.status(201).json({ message: "subcategory created", data: subcategory });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};

getAllsubCategory = async(req, res) => {
    try {
	const subcategories = await SubCategory.find({})
	      .populate("category")
	      .populate("products");
	res.status(200).json({
	    message: "list of subcategories",
	    data: subcategories,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
getsubcategoryById = async(req, res) => {
    try {
	const subcategory = await SubCategory.findById({
	    _id: req.params.id,
	});
	res.status(200).json({ message: "subcategory by Id", data: subcategory });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
getsubcategoryByName = async(req, res) => {
    try {
	const subcategory = await SubCategory.find({
	    name: req.query.name,
	});
	res.status(200).json({
	    message: "subcategory by name",
	    data: subcategory,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
updatesubCategory = async(req, res) => {
    try {
	await SubCategory.updateOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "subcategory updated" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
deletesubCategory = async(req, res) => {
    try {
	await SubCategory.deleteOne({ _id: req.params.id });
	res.status(200).json({ message: "subcategory delete" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};

module.exports = {
    createsubCategory,
    getAllsubCategory,
    getsubcategoryById,
    getsubcategoryByName,
    updatesubCategory,
    deletesubCategory,
};
