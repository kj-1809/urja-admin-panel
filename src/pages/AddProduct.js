import React from "react";
import "./AddProduct.css";
import TextInput from "../components/TextInput";
import { collection, addDoc } from "firebase/firestore"; 
import {useState} from 'react'
import {db} from "../firebase"
import { useNavigate } from "react-router-dom";



const AddProduct = () => {
	
	const [productId, setProductId] = useState(0);
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const navigate = useNavigate()

	
	async function handleSubmit(){
		const docRef = await addDoc(collection(db, "products"), {
			productId: Number(productId),
			productName: productName,
			price: price,
			discount: discount,
			img : "",
		});
		console.log("Document written with ID: ", docRef.id);
		navigate('/products')
	}

	return (
		<div className="addProductContainer">
			<div className="headingContainerAddProduct">
				<h1>Add Product</h1>
			</div>

			<div>
				<form>
					<TextInput placeholder="Product ID" value = {productId} onChange = {(e) => setProductId(e.target.value)}/>
					<TextInput placeholder="Product Name" value = {productName} onChange = {(e) => setProductName(e.target.value)}/>
					<TextInput placeholder="Price" value = {price} onChange = {(e) => setPrice(e.target.value)}/>
					<TextInput placeholder="Discount" value = {discount} onChange = {(e) => setDiscount(e.target.value)}/>
				</form>
			</div>
			<div className = "buttonContainerAddProduct">
				<button className="uploadImageButton">Upload Image</button>
				<button className="submitButton" onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default AddProduct;
