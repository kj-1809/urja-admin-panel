import React from "react";
import "./EditProduct.css";
import TextInput from "../components/TextInput";

const EditProduct = () => {
	return (
		<div className="editProductContainer">
			<div className="headingContainerEditProduct">
				<h1>Edit Product</h1>
			</div>

			<div>
				<form>
					<TextInput placeholder="Product ID" />
					<TextInput placeholder="Product Name" />
					<TextInput placeholder="Price" />
					<TextInput placeholder="Discount" />
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
