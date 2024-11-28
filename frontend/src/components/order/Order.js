import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./order.css";
import { URL } from "../token";

const QueueOrders = () => {
	const [datetime, setDatetime] = useState("");
	const [queues, setQueues] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			year: "2-digit",
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		const formattedDatetime = formatDate(datetime);

		try {
			const res = await axios.post(
				`${URL}/api/orders`,
				{ time: formattedDatetime },
				{
					headers: {
						"x-auth-token": token,
					},
				}
			);
			if (res.status === 200) {
				alert("Muvaffaqiyatli qo'shildingiz!");
			} else {
				alert("Xatolik! Iltimos qaytadan urinib ko'ring");
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
			alert("Xatolik! Iltimos qaytadan urinib ko'ring");
		} finally {
			setisLoading(false);
			navigate("/");
		}
	};

	const fetchQueues = async () => {
		try {
			const res = await axios.get(`${URL}/api/orders`, {
				headers: {
					"x-auth-token": token,
				},
			});
			setQueues(res.data);
		} catch (err) {
			console.error(err.response.data);
		}
	};

	useEffect(() => {
		if (token) {
			fetchQueues();
		} else {
			navigate("/login");
		}
	}, [token]);

	useEffect(() => {
		const verifyToken = async () => {
			try {
				await axios.get("http://172.20.10.10:5000/api/user/me", {
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
		<div className="container">
			<div className="queue_box">
				<h2 className="title_queue">Available</h2>
				<p className="desc_queue">
					We recommend that you fill it out as shown in the sample.
				</p>
				{queues ? (
					<div className="scrollable">
						{queues.map((order) => {
							return (
								<div key={order._id}>
									<span>{order.time}</span>
								</div>
							);
						})}
					</div>
				) : (
					<div className="no_queue">
						<p>There are no queues yet</p>
					</div>
				)}
			</div>

			<div className="queue_box">
				<h2 className="title_queue">Queue</h2>
				<p className="desc_queue">
					We recommend that you fill it out as shown in the sample.
				</p>
				<form onSubmit={onSubmit} className="form_queue">
					<input
						value={datetime}
						placeholder={new Date().toLocaleString("en-US", {
							year: "2-digit",
							month: "numeric",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
						})}
						onChange={(e) => setDatetime(e.target.value)}
						required
					/>
					<button type="submit" className="btn_queue">
						{isLoading ? "Loading..." : "Add"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default QueueOrders;
