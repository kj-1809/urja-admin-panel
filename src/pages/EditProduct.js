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
	deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { v4 } from "uuid";

const EditProduct = () => {
	const { id } = useParams();
	// console.log("id : ", id);
	const navigate = useNavigate();
	const [productData, setProductData] = useState({});
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [currentImg, setCurrentImg] = useState("");
	const [uploadFile, setUploadFile] = useState(null);
	const [imgUrl, setImgUrl] = useState("");
	const [docId, setDocId] = useState("");
	const [uploadSuccessful, setUploadSuccessful] = useState(false);

	async function handleDelete() {
		console.log("TRIGGER deleted");
		await deleteDoc(doc(db, "products", docId));
		console.log("Successfully deleted");
		navigate("/products");
	}

	function handleUpload() {
		if (uploadFile == null) {
			alert("Please select an image to upload");
			return;
		}
		console.log("begun");
		const imgRef = ref(storage, `images/${uploadFile.name + v4()}`);
		uploadBytes(imgRef, uploadFile)
			.then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImgUrl(url);
					console.log("uploaded image");
					setUploadSuccessful(true);
				});
			})
			.catch((error) => {
				console.log("Error occured : ", error);
			});
	}

	async function handleSubmit() {
		await updateDoc(doc(db, "products", docId), {
			productId: productId,
			productName: productName,
			price: price,
			discount: discount,
			img: imgUrl,
		});
		console.log("Product Update successful");
		navigate("/products");
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
			setDocId(doc.id);
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
		setCurrentImg(productData.img);
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
				</form>
			</div>


			<div className="imageInputContainer">
				<img src={currentImg} alt="current-image" className="currentImage" />
				<input
					className = "inputStyle"
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
			</div>


			<div className="buttonContainerEditProduct">
				<button className="submitButton" onClick={handleSubmit}>
					Update
				</button>
				<button className="deleteProductButton" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default EditProduct;
