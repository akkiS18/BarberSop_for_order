import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { URL } from "../token";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setisLoading] = useState(false);

	const navigate = useNavigate();
	const { email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		try {
			const res = await axios.post(`${URL}/api/auth/login`, formData);
			localStorage.setItem("token", res.data.token);
			setisLoading(false);
			navigate("/");
			console.log("SUCCESS");
		} catch (err) {
			console.error(err.response.data);
			setisLoading(false);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	return (
		<div className="container_auth">
			<div className="form_container_login">
				<p>Login</p>
				<form onSubmit={onSubmit} className="form_auth">
					<label>Email</label>
					<input
						className="input"
						type="email"
						name="email"
						value={email}
						onChange={onChange}
						placeholder="Email"
						required
					/>
					<label>Password</label>
					<input
						className="input"
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						placeholder="Password"
						required
					/>
					<button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
					<a type="button" href="/register">
						Sign up
					</a>
				</form>
			</div>
		</div>
	);
};

export default Login;
