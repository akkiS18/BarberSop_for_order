const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");

// Buyurtma qo'shish
router.post("/", auth, async (req, res) => {
	const { time } = req.body;

	try {
		const newOrder = new Order({
			user: req.user.id,
			time,
		});

		const order = await newOrder.save();
		res.json(order);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server xatosi");
	}
});

// Foydalanuvchi buyurtmalarini olish
router.get("/", auth, async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });
		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server xatosi");
	}
});

module.exports = router;
