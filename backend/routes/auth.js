const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Ro'yxatdan o'tish
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// Foydalanuvchini tekshirish
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: "Foydalanuvchi allaqachon mavjud" });
		}

		user = new User({
			username,
			email,
			password,
		});

		// Parolni shifrlash
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// JWT token yaratish
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: "1d" },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server xatosi");
	}
});

// Kirish
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		// Foydalanuvchini topish
		let user = await User.findOne({ email });
		if (!user) {
			// Foydalanuvchiga email noto'g'ri ekanligini bildirish
			return res.status(400).json({ msg: "Noto'g'ri email" });
		}

		// Parolni tekshirish
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			// Foydalanuvchiga parol noto'g'ri ekanligini bildirish
			return res.status(400).json({ msg: "Noto'g'ri parol" });
		}

		// JWT token yaratish
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: "1d" },
			(err, token) => {
				if (err) throw err;
				// Tokenni qaytarish
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		// Server xatosi uchun javob qaytarish
		res.status(500).send("Server xatosi");
	}
});

module.exports = router;
