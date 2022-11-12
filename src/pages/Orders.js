import React from "react";
import "./Orders.css";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "time", headerName: "Time", flex: 1.5 },
	{ field: "orderId", headerName: "Order ID", flex: 1 },
	{ field: "itemName", headerName: "Item Name", flex: 1.5 },
	{ field: "quantity", headerName: "Quantity", flex: 1 },
	{ field: "price", headerName: "Price", flex: 1 },
	{ field: "total", headerName: "Total", flex: 1.2 },
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

const rows = [
	{
		id: 1,
		itemName: "Snow",
		firstName: "Jon",
		age: 35,
		orderStatus: "Fulfilled",
	},
	{
		id: 2,
		lastName: "Lannister",
		firstName: "Cersei",
		age: 42,
		orderStatus: "Pending",
	},
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Orders = () => {
	return (
		<div className="container">
			<div className="headingContainerOrders">
				<h1>Orders</h1>
			</div>
			<div className="dataTableContainer">
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
				/>
			</div>
		</div>
	);
};

export default Orders;
