const list = require("../Models/list");
const SubCategory = require("../Models/SubCategory");
const Category = require("../Models/Category");
//   create product 
createlist = async(req, res) => {
    try {
	
	const list = new list(req.body);
	await list.save();
	await SubCategory.findByIdAndUpdate(req.body.subcategory, {
	    $push: { list: list },
	});
	res.status(201).json({ message: "list created", data: list });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//Get all list//
getAlllist = async(req, res) => {
    try {
	const list = await list.find({}).populate("subcategory");
	res.status(200).json({ message: "list of list", data: list });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//product by list //
getlistByReference = async(req, res) => {
    try {
	const list = await list.find({ reference: req.query.reference });
	res.status(200).json({
	    message: "list by reference",
	    data: list,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// list by id //
getlistById = async(req, res) => {
    try {
	const list = await list.findById({ _id: req.params.id });
	res.status(200).json({ message: "list by Id", data: list });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//  update product//
updatelist = async(req, res) => {
    try {
	await list.updateOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "list updated" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// delete product//
deletelist = async(req, res) => {
    try {
	const prod = await list.findById({ _id: req.params.id });
	await SubCategory.findByIdAndUpdate(prod.SubCategory, {
	    $pull: { list: req.params.id },
	});
	await list.deleteOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "list deleted" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
module.exports = {
    createlist,
    getAlllist,
    getlistByReference,
    getlistById,
    updatelist,
    deletelist,
};
