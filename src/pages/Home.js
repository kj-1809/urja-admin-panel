import React from "react";
import {Card} from "../components/Card"
import "./Home.css"

export const Home = () => {
	return (
		<div className="container">
			<div className="headingContainer">
				<h1>Dashboard</h1>
			</div>
			<div className="cardContainer">
				<Card title="Total Revenue" value="$9999" />
				<Card title="Total Sales" value="38" />
				<Card title="Total Orders" value="90" />
			</div>
		</div>
	);
};
