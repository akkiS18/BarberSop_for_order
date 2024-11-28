import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/home";
import QueueOrders from "./components/order/Order";
import Navbar from "./components/navbar/navbar";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/orders" element={<QueueOrders />} />
			</Routes>
		</Router>
	);
};

export default App;
