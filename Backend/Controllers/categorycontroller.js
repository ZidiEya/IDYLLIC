const Category = require("../Models/Category");
const SubCategory = require("../Models/SubCategory");

createCategory = async (req, res) => {
    try {
	const category = new Category(req.body);
	await category.save();
	res.status(201).json({ message: "category created", data: category });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};

getAllCategory = async (req, res) => {
    try {
	const categories = await Category.find({}).populate("subcategories");
	res.status(200).json({
	    message: "list of categories",
	    data: categories,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
getcategoryById = async (req, res) => {
    try {
	const category = await Category.findById({
	    _id: req.params.id,
	});
	res.status(200).json({ message: "category by Id", data: category });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
getcategoryByName = async (req, res) => {
    try {
	const category = await Category.find({
	    name: req.query.name,
	});
	res.status(200).json({
	    message: "category by name",
	    data: category,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
updateCategory = async (req, res) => {
    try {
	await Category.updateOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "category updated" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
deleteCategory = async (req, res) => {
    try {
	await Category.deleteOne({ _id: req.params.id });
	res.status(200).json({ message: "category deleted" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategory,
    getcategoryById,
    getcategoryByName,
    updateCategory,
    deleteCategory,
};
