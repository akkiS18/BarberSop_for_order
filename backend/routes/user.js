// routes/user.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Foydalanuvchi ma'lumotlarini olish
router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.error("Auth route xatosi:", error);
		res.status(500).send("Server xatosi");
	}
});

module.exports = router;
