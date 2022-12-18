import React, { useEffect, useState } from "react";
import "./Products.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

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
		field: "quantity",
		headerName: "Inventory",
		flex: 1,
	},
	{
		field: "actions",
		headerName: "Actions",
		flex: 0.8,
		renderCell: (params) => {
			return (
				<div>
					<Link to={`/products/${params.row.productId}`}>
						<button className="editButton">Edit</button>
					</Link>
				</div>
			);
		},
	},
];
const Products = () => {
	const [products, setProducts] = useState([]);

	async function fetchProducts() {
		const querySnapshot = await getDocs(collection(db, "products"));
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log("product : ");
			console.log(doc.id, " => ", doc.data());
			arr.push(doc.data());
		});
		setProducts(arr);
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="container">
			<div className="headingContainerProducts">
				<div className="titleContainer">
					<h1>Products</h1>
				</div>
				<div className="addProductButtonContainer">
					<Link to="/addproduct">
						<button className="addButton">Add Product</button>
					</Link>
				</div>
			</div>
			<div className="productsDataTable">
				<DataGrid
					rows={products}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					getRowId={(row) => row.productId}
				/>
			</div>
		</div>
	);
};

export default Products;
