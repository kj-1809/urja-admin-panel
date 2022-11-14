import React, { useEffect, useState } from "react";
import "./Orders.css";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const columns = [
	{ field: "time", headerName: "Time", flex: 1.5 },
	{ field: "orderId", headerName: "Order ID", flex: 1 },
	{ field: "productName", headerName: "Product Name", flex: 1.5 },
	{ field: "quantity", headerName: "Quantity", flex: 1 },
	{
		field: "price",
		headerName: "Price",
		flex: 1,
		renderCell: (params) => {
			return <span>Rs. {params.row.price}</span>;
		},
	},
	{
		field: "total",
		headerName: "Total",
		flex: 1.2,
		renderCell: (params) => {
			return <span>Rs. {params.row.price * params.row.quantity}</span>;
		},
	},
	{
		field: "orderStatus",
		headerName: "Order Status",
		flex: 1,
		renderCell: (params) => {
			return (
				<span className={`statusTag ${params.row.orderStatus}`}>
					{params.row.orderStatus}
				</span>
			);
		},
	},
	{
		field: "actions",
		headerName: "Actions",
		flex: 1.5,
		renderCell: (params) => {
			return (
				<div className="actionsContainer">
					<button className="markButton">Mark as fulfilled</button>
				</div>
			);
		},
	},
];

const Orders = () => {
	const [orders, setOrders] = useState([]);

	async function fetchOrders() {
		const querySnapshot = await getDocs(collection(db, "orders"));
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			arr.push(doc.data());
		});
		setOrders(arr);
	}

	useEffect(() => {
		fetchOrders();
	} , []);

	return (
		<div className="container">
			<div className="headingContainerOrders">
				<h1>Orders</h1>
			</div>
			<div className="dataTableContainer">
				<DataGrid
					rows={orders}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					key={orders.orderId}
					getRowId={(row) => row.orderId}
				/>
			</div>
		</div>
	);
};

export default Orders;
