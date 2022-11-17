import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import TextInput from "../components/TextInput";
import { Navigate, useParams } from "react-router-dom";
import {
	collection,
	query,
	where,
	getDocs,
	updateDoc,
	doc,
	deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
	const { id } = useParams();
	// console.log("id : ", id);
	const navigate = useNavigate();
	const [productData, setProductData] = useState({});
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [docId , setDocId] = useState("");

	async function handleDelete(){

		console.log("TRIGGER deleted")
		await deleteDoc(doc(db ,"products" , docId))
		console.log("Successfully deleted")
		navigate("/products")
	}

	async function handleSubmit() {
		await updateDoc(doc(db, "products", docId), {
			productId: productId,
			productName: productName,
			price: price,
			discount: discount,
		});
		console.log("Product Update successful")
		navigate('/products')
	}

	async function fetchProductData(id) {
		const q = query(
			collection(db, "products"),
			where("productId", "==", Number(id))
		);
		const querySnapshot = await getDocs(q);
		console.log("size : ", querySnapshot.size);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setDocId(doc.id)
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

	console.log(productName);

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
				<button className="submitButton" onClick={handleSubmit}>
					Update
				</button>
				<button className="deleteProductButton" onClick = {handleDelete}>Delete</button>
			</div>
		</div>
	);
};

export default EditProduct;
