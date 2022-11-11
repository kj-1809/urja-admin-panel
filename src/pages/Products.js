import React from "react";
import "./Products.css";

import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "productId", headerName: "Product ID", flex: 1 },
	{ field: "productName", headerName: "Product Name", flex: 2 },
	{ field: "price", headerName: "Price", flex: 1 },
	{
		field: "discount",
		headerName: "Discount",
		flex: 1,
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

const Products = () => {
	return (
		<div className="container">
			<div className="headingContainer">
				<h1>Products</h1>
			</div>
			<div className="productsDataTable">
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

export default Products;
