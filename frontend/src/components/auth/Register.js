import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { URL } from "../token";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [isLoading, setisLoading] = useState(false);

	const navigate = useNavigate();
	const { username, email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const axiosInstance = axios.create({
		baseURL: URL,
		timeout: 5000, // 5 soniya
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		try {
			const res = await axiosInstance.post("/api/auth/register", formData);
			if (res && res.status === 200) {
				localStorage.setItem("token", res.data.token);
				navigate("/");
				console.log("SUCCESS");
			} else {
				console.error("Error: Unexpected response status", res);
			}
		} catch (err) {
			if (err.response) {
				console.error("Serverdan xato:", err.response.data);
			} else if (err.request) {
				console.error("So'rov yuborildi, lekin javob olinmadi", err.request);
			} else {
				console.error("Xato yuz berdi:", err.message);
			}
		} finally {
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
			<div className="form_container_register">
				<p>Register</p>
				<form
					onSubmit={onSubmit}
					className="form_auth"
					style={{ marginTop: "0" }}>
					<label>Username</label>
					<input
						className="input"
						type="text"
						name="username"
						value={username}
						onChange={onChange}
						placeholder="Username"
						required
					/>
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
					<a type="button" href="/login">
						Sign in
					</a>
				</form>
			</div>
		</div>
	);
};

export default Register;
