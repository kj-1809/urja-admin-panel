import React from "react";
import "./AddProduct.css";
import TextInput from "../components/TextInput";
import TextInputMod from "../components/TextInputMod";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import LinearIndeterminate from "../components/LinearIndeterminate";

import { v4 } from "uuid";

const AddProduct = () => {
	const [productId, setProductId] = useState(0);
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [imgUrl, setImgUrl] = useState("");
	const [uploadFile, setUploadFile] = useState(null);
	const [uploadSuccessful, setUploadSuccessful] = useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);

	async function handleSubmit() {
		setLoading(true);
		const docRef = await addDoc(collection(db, "products"), {
			productId: Number(productId),
			productName: productName,
			price: Number(price),
			discount: Number(discount),
			img: imgUrl,
			quantity: Number(quantity),
		});
		setLoading(false);
		navigate("/products");
	}

	function handleUpload() {
		//set loading to true
		if (uploadFile == null) {
			alert("Please select an image to upload");
			return;
		}
		setUploading(true);
		const imgRef = ref(storage, `images/${uploadFile.name + v4()}`);
		uploadBytes(imgRef, uploadFile)
			.then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImgUrl(url);
					setUploadSuccessful(true);
					setUploading(false);
				});
			})
			.catch((error) => {
				alert("There was an error uploading the file. Please try again !");
				setUploading(false);
			});
	}

	if (loading) {
		return <LinearIndeterminate />;
	}

	return (
		<>
			{uploading ? <LinearIndeterminate /> : null}
			<div className="inputPageContainer">
				<div className="headingContainerAddProduct">
					<h1>Add Product</h1>
				</div>

				<div>
					<form>
						<TextInputMod
							placeholder="Product Id"
							value={productId}
							onChange={(e) => setProductId(e.target.value)}
						/>
						<TextInputMod
							placeholder="Product Name"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
						<TextInputMod
							placeholder="Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<TextInputMod
							placeholder="Discount"
							value={discount}
							onChange={(e) => setDiscount(e.target.value)}
						/>
						<TextInputMod
							placeholder="Inventory"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</form>
				</div>
				<div className="buttonContainerAddProduct">
					<input
						className="imageSelector"
						type="file"
						onChange={(e) => setUploadFile(e.target.files[0])}
						accept="image/jpeg , image/png"
					/>
					<button className="uploadImageButton" onClick={handleUpload}>
						Upload Image
					</button>
					<span hidden={!uploadSuccessful} className="successMarker">
						✅ Upload successful !
					</span>
					<button className="submitButton" onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default AddProduct;
