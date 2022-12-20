import React, { useEffect, useState } from "react";
import "./Orders.css";
import { DataGrid } from "@mui/x-data-grid";
import {
	collection,
	getDocs,
	orderBy,
	query,
	updateDoc,
	doc,
} from "firebase/firestore";
import { db } from "../firebase";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [reload, setReload] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(false);

	const columns = [
		{
			field: "createdAt",
			headerName: "Time",
			flex: 2,
			renderCell: (params) => {
				const seconds = params.row.createdAt.seconds;
				const currentTime = new Date(seconds * 1000);
				console.log(currentTime.toLocaleString());
				// currentTime.toString().slice(4, 25)
				const options = {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour : "numeric",
					minute : "numeric",
					second : "numeric",
				};
				return <span>{currentTime.toLocaleString("en-GB", options)}</span>;
			},
		},
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
						<button
							disabled={params.row.orderStatus == "Fulfilled"}
							className="markButton"
							onClick={async () => {
								console.log("Pressed");
								await updateDoc(doc(db, "orders", params.row.docId), {
									orderStatus: "Fulfilled",
								});
								setReload(!reload);
							}}
						>
							Mark as fulfilled
						</button>
					</div>
				);
			},
		},
	];

	async function fetchOrders() {
		const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
		const querySnapshot = await getDocs(q);
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			let tempObj = doc.data();
			tempObj["docId"] = doc.id;
			arr.push(tempObj);
		});
		setOrders(arr);
	}

	useEffect(() => {
		fetchOrders();
	}, [reload]);

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
