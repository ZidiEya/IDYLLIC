const Order = require("../Models/Order");
const Customer = require("../Models/Customer");
// create Order
createOrder = async (req, res) => {
    try {
	const neworder = new Order(req.body);
	const order = await neworder.save();
	await Customer.findByIdAndUpdate(req.body.customer, {
	    $push: { orders: order },
	});
	res.status(201).json({ message: "order created", data: order });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
// func to get order by Customer
orderBycustomer = async (req, res) => {
    try {
	const orders = req.user.orders
	res.status(200).json({
	    message: "list customer orders",
	    data: orders,
	});
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
};
//  func to delete order
delleteorder=async(req,res)=>{
    try {
	await Customer.findByIdAndUpdate(req.user._id, {
	    $pull: { orders: req.params.id }, });
	await Order.deleteOne({ _id: req.params.id });

	res.status(200).json({ message: "order deleted" });
    } catch (error) {
	res.status(406).json({ message: "error is " + error.message });
    }
}

module.exports = {
    createOrder,
    orderBycustomer,
    delleteorder
};
