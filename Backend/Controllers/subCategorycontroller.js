const SubCategory = require("../Models/SubCategory");
const Category = require("../Models/Category");
// create subcategory
createsubCategory = async(req, res) => {
    try {
	const subcategory = new SubCategory(req.body);
	res.status(201).json({ message: "subcategory created", data: subcategory });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// get all subcategory list of subcategory
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
// get subcategory by id
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
// get subcategory by name
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
// update subcategory
updatesubCategory = async(req, res) => {
    try {
	await SubCategory.updateOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "subcategory updated" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// delete subcategory
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
