import React from "react";
import "./EditProduct.css";
import TextInput from "../components/TextInput"

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
				</form>
			</div>
			<div className="buttonContainer">
				<button className="uploadImageButton">Upload Image</button>
				<button className="submitButton">Update</button>
			</div>
		</div>
	);
};

export default EditProduct;
