const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
	origin: "http://localhost:3000", // Front-end manzilini kiriting
	methods: "GET,POST,PUT,DELETE",
	allowedHeaders: "Content-Type, Authorization, x-auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB bilan ulanish
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB ga ulandi"))
	.catch((err) => {
		console.error("MongoDB ulanish xatosi:", err);
		process.exit(1); // Xatolikdan keyin serverni to'xtatish
	});

// Route'larni qo'shish (keyinchalik yaratamiz)
app.use("/api/auth", (req, res, next) => {
	try {
		authRoutes(req, res, next);
	} catch (err) {
		console.error("Auth route xatosi:", err);
		res.status(500).send("Server xatosi");
	}
});
app.use("/api/orders", (req, res, next) => {
	try {
		orderRoutes(req, res, next);
	} catch (error) {
		console.error("Auth route xatosi:", err);
		res.status(500).send("Server xatosi");
	}
});
app.use("/api/user", (req, res, next) => {
	try {
		userRoutes(req, res, next);
	} catch (error) {
		console.error("Auth route xatosi:", err);
		res.status(500).send("Server xatosi");
	}
});

app.listen(PORT, () => {
	console.log(`Server ${PORT} portda ishga tushdi`);
});
