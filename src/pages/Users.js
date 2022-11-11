import React from "react";
import "./Users.css";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "name", headerName: "Name", flex: 1 },
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "gstin", headerName: "GSTIN", flex: 2 },
	{
		field: "discount5",
		headerName: "Discount 5KG",
		flex: 1.1,
	},
	{
		field: "discount19",
		headerName: "Discount 19KG",
		flex: 1.2,
	},
	{
		field: "discount47",
		headerName: "Discount 47KG",
		flex: 1.2,
	},
	{
		field: "discount430",
		headerName: "Discount 430KG",
		flex: 1.2,
	},
	{
		field: "actions",
		headerName: "Actions",
		flex: 0.8,
		renderCell: (params) => {
			return (
				<div>
					<button className = "editButton">
						Edit
					</button>
				</div>
			)
		},
	},
];

const rows = [
	{ id: 1, productName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Users = () => {
	return (
		<div className="container">
			<div className="headingContainer">
				<h1>Users</h1>
			</div>

			<div className = "usersDataTable">
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

export default Users;
