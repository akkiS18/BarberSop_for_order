import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../token";

export default function Navbar() {
	const [user, setUser] = useState(null);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
	};

	// Foydalanuvchi ma'lumotlarini olish
	const fetchUser = async () => {
		if (token) {
			try {
				const res = await axios.get(`${URL}/api/user/me`, {
					headers: {
						"x-auth-token": token,
					},
				});
				setUser(res.data);
			} catch (err) {
				console.error(err.response.data);
			}
		}
	};

	useEffect(() => {
		fetchUser();
	}, [token]);

	const handleBack = () => {
		if (token) {
			navigate("/");
		}
	};

	return (
		<div>
			<nav
				className="navbar"
				style={
					token
						? { justifyContent: "space-between" }
						: { justifyContent: "center" }
				}>
				<img src="/images/logo.jpg" alt="Logo" onClick={handleBack} />
				{user && (
					<div className="right">
						<div className="profile_content">
							<img
								className="profile"
								src="/images/user.png"
								alt="User Profile"
							/>
							<p>{user.username}</p>
						</div>
						<a href="/login" className="profile_content" onClick={logout}>
							<img src="/SVG/logout.svg" className="logout" alt="logout" />
							<p style={{ color: "crimson" }}>Logout</p>
						</a>
					</div>
				)}
			</nav>
		</div>
	);
}
