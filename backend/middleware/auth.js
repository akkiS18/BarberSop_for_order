const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	// Tokenni tekshirish
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "Token talab qilinadi" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token yaroqsiz" });
	}
};
