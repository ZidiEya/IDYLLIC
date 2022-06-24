const Product = require("../Models/Product");
const SubCategory = require("../Models/SubCategory");
const Category = require("../Models/Category");
//   create product //
createproduct = async(req, res) => {
    try {
	//   req.body["picture"] = req.file.filename;
	req.body['gallery'] =
	    req.files.length <= 0 ? [] :
	    req.files.map(function(file) {
		return { name: file.filename, description: 'add prod' }
	    })
	const product = new Product(req.body);
	await product.save();
	//push products in subcategory
	//await SubCategory.findByIdAndUpdate(req.body.subcategory, {
	//$push: { products: product },
	//  });
	res.status(201).json({ message: "product created", data: product });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//Get all product //
getAllproduct = async(req, res) => {
    try {
	const products = await Product.find({}).populate("subcategory");
	res.status(200).json({ message: "list of pruducts", data: products });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//product by reference //
getproductByReference = async(req, res) => {
    try {
	const product = await Product.find({ reference: req.query.reference });
	res.status(200).json({
	    message: "product by reference",
	    data: product,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// product by id //
getproductById = async(req, res) => {
    try {
	const product = await Product.findById({ _id: req.params.id });
	res.status(200).json({ message: "product by Id", data: product });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//  update product//
updateproduct = async(req, res) => {
    try {
	await Product.updateOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "product updated" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// delete product//
deleteproduct = async(req, res) => {
    try {
	const prod = await Product.findById({ _id: req.params.id });
	await SubCategory.findByIdAndUpdate(prod.SubCategory, {
	    $pull: { products: req.params.id },
	});
	await Product.deleteOne({ _id: req.params.id }, req.body);
	res.status(200).json({ message: "product deleted" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
module.exports = {
    createproduct,
    getAllproduct,
    getproductByReference,
    getproductById,
    updateproduct,
    deleteproduct,
};
