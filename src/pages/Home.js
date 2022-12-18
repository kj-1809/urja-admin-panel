import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";
import "./Home.css";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import BasicTable from "../components/BasicTable";

const Home = () => {
	const [productData, setProductData] = useState([]);
	const [ordersData, setOrdersData] = useState([]);
	const [inventory5, setInventory5] = useState(0);
	const [inventory19, setInventory19] = useState(0);
	const [inventory47, setInventory47] = useState(0);
	const [inventory430, setInventory430] = useState(0);
	const [revenue, setRevenue] = useState(0);
	const [totalOrders, setTotalOrders] = useState(0);

	const fetchProducts = async () => {
		const querySnapshot = await getDocs(collection(db, "products"));
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log("product : ");
			console.log(doc.id, " => ", doc.data());
			arr.push(doc.data());
		});
		setProductData(arr);
	};

	const fetchOrders = async () => {
		const curDate = new Date();
		console.log("CUR DATE");
		console.log(curDate);
		const newDate = new Date(curDate - 30 * 24 * 60 * 60 * 1000);
		console.log(newDate);


		const q = query(collection(db, "orders"), where("createdAt" , ">=" , newDate));
		
		const querySnapshot = await getDocs(q);
		let arr = [];
		querySnapshot.forEach((doc) => {
			arr.push(doc.data());
			console.log(doc.data())
		});
		setOrdersData(arr);
	};

	useEffect(() => {
		fetchProducts();
		fetchOrders();
	}, []);

	useEffect(() => {
		for (let i = 0; i < productData.length; ++i) {
			if (productData[i].productId == 1) {
				setInventory5(productData[i].quantity);
			}
			if (productData[i].productId == 2) {
				setInventory19(productData[i].quantity);
			}
			if (productData[i].productId == 3) {
				setInventory47(productData[i].quantity);
			}
			if (productData[i].productId == 4) {
				setInventory430(productData[i].quantity);
			}
		}
	}, [productData]);

	useEffect(() => {
		let total = 0;
		for (let i = 0; i < ordersData.length; ++i) {
			total += ordersData[i].price * ordersData[i].quantity;
		}
		setRevenue(total);
		setTotalOrders(ordersData.length);
	}, [ordersData]);

	return (
		<div className="container">
			<div className="headingContainerDash">
				<h1>Dashboard</h1>
			</div>
			<div className="cardContainer">
				<Card title="Total Revenue (Last 30 Days)" value={`Rs. ${revenue}`} />
				<Card title="Total Orders (Last 30 Days)" value={totalOrders} />
				<Card
					title="Inventory (5KG Cylinder)"
					value={inventory5}
					style={inventory5 <= 50 ? "red" : "green"}
				/>
				<Card
					title="Inventory (19KG Cylinder)"
					value={inventory19}
					style={inventory19 <= 20 ? "red" : "green"}
				/>
				<Card
					title="Inventory (47KG Cylinder)"
					value={inventory47}
					style={inventory47 <= 50 ? "red" : "green"}
				/>
				<Card
					title="Inventory (430KG Cylinder)"
					value={inventory430}
					style={inventory430 <= 50 ? "red" : "green"}
				/>
			</div>

			{/* <div className="tableContainer">
				<BasicTable />
			</div> */}
		</div>
	);
};

export default Home;
