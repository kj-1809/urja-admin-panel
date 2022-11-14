import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import TextInput from "../components/TextInput";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const EditProduct = () => {
	const { id } = useParams();
	// console.log("id : ", id);

	const [productData, setProductData] = useState({});
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState();
	const [discount, setDiscount] = useState();

	async function fetchProductData(id) {
		const q = query(
			collection(db, "products"),
			where("productId", "==", Number(id))
		);
		const querySnapshot = await getDocs(q);
		console.log("size : ", querySnapshot.size);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setProductData(doc.data());
		});
	}

	useEffect(() => {
		fetchProductData(id);
	}, []);

	useEffect(() => {
		setProductId(productData.productId);
		setProductName(productData.productName);
		setPrice(productData.price);
		setDiscount(productData.discount);
	}, [productData]);


	console.log(productName)

	return (
		<div className="editProductContainer">
			<div className="headingContainerEditProduct">
				<h1>Edit Product</h1>
			</div>

			<div>
				<form>
					<TextInput
						placeholder="Product ID"
						value={productId}
						onChange={(e) => setProductId(e.target.value)}
					/>
					<TextInput
						placeholder="Product Name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>
					<TextInput
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<TextInput
						placeholder="Discount"
						value={discount}
						onChange={(e) => setDiscount(e.target.value)}
					/>
					<button className="uploadImageButton">Upload Image</button>
				</form>
			</div>
			<div className="buttonContainerEditProduct">
				<button className="submitButton">Update</button>
				<button className="deleteProductButton">Delete</button>
			</div>
		</div>
	);
};

export default EditProduct;
