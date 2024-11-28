import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { URL } from "../token";
import axios from "axios";

function Home() {
	const [mode, setMode] = useState(0);

	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const handleOreder = () => {
		navigate("/orders");
	};

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
		const verifyToken = async () => {
			try {
				await axios.get(`${URL}/api/user/me`, {
					headers: {
						"x-auth-token": localStorage.getItem("token"),
					},
				});
			} catch (err) {
				if (err.response && err.response.status === 401) {
					localStorage.removeItem("token");
					navigate("/login");
				}
			}
		};

		verifyToken();
	}, [navigate]);

	return (
		<div className="home">
			<header className="home_header">
				<section className="content">
					<div className="box">
						<a
							className="title"
							style={{ cursor: "pointer" }}
							onClick={() => setMode(0)}>
							<h2>About</h2>
						</a>
						<div className="desc">
							{mode === 0 && (
								<p>
									At BarberShop, we offer professional grooming services in a
									welcoming environment. Our skilled barbers ensure every client
									leaves feeling confident and looking their best.
								</p>
							)}
							{mode === 1 && (
								<p>
									Our expert barbers provide precise haircuts tailored to your
									style, from classic cuts to modern trends, ensuring you leave
									looking sharp and stylish every time.
								</p>
							)}
							{mode === 2 && (
								<p>
									Keep your beard looking sharp with our detailed beard trimming
									service. We shape, style, and groom your beard to perfection,
									enhancing your facial features.
								</p>
							)}
							{mode === 3 && (
								<p>
									Enjoy a traditional hot towel shave with soothing steam and
									precision razor work, delivering a smooth, close shave and a
									relaxing experience.
								</p>
							)}
						</div>
					</div>
					<div className="box">
						<h2 className="title">Services</h2>
						<div className="services_box">
							<div className="service" onClick={() => setMode(1)}>
								<img src="/SVG/scissors.svg" width={60} height={60} />
								<p>Haircut</p>
							</div>
							<div className="service" onClick={() => setMode(2)}>
								<img src="/SVG/favicon.svg" width={60} height={60} />
								<p>Beard Trim</p>
							</div>
							<div className="service" onClick={() => setMode(3)}>
								<img src="/SVG/towel.svg" width={60} height={60} />
								<p>Hot Towel</p>
							</div>
						</div>
						<button className="btn" onClick={handleOreder}>
							Add queue
						</button>
					</div>
				</section>
			</header>
		</div>
	);
}

export default Home;
