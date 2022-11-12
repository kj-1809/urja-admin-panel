import React from "react";
import "./AddProduct.css";
import TextInput from "../components/TextInput";

const AddProduct = () => {
	return (
		<div className="addProductContainer">
			<div className="headingContainerAddProduct">
				<h1>Add Product</h1>
			</div>

			<div>
				<form>
					<TextInput placeholder="Product ID"/>
					<TextInput placeholder="Product Name" />
					<TextInput placeholder="Price" />
					<TextInput placeholder="Discount" />
				</form>
			</div>
			<div className = "buttonContainer">
				<button className="uploadImageButton">Upload Image</button>
				<button className="submitButton">Submit</button>
			</div>
		</div>
	);
};

export default AddProduct;
