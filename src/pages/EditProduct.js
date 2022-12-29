import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import TextInput from "../components/TextInput";
import TextInputMod from "../components/TextInputMod";
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
import LinearIndeterminate from "../components/LinearIndeterminate";

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [productData, setProductData] = useState({});
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [currentImg, setCurrentImg] = useState("");
	const [uploadFile, setUploadFile] = useState(null);
	const [imgUrl, setImgUrl] = useState("");
	const [docId, setDocId] = useState("");
	const [uploadSuccessful, setUploadSuccessful] = useState(false);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);

	async function handleDelete() {
		setLoading(true);
		await deleteDoc(doc(db, "products", docId));
		setLoading(false);
		navigate("/products");
	}

	function handleUpload() {
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
				alert("Some error occured . Please try again!");
				setUploading(false);
			});
	}

	async function handleSubmit() {
		setLoading(true);
		await updateDoc(doc(db, "products", docId), {
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

	async function fetchProductData(id) {
		setLoading(true);
		const q = query(
			collection(db, "products"),
			where("productId", "==", Number(id))
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setDocId(doc.id);
			setProductData(doc.data());
		});
		setLoading(false);
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
		setQuantity(productData.quantity);
	}, [productData]);


	if (loading) {
		return <LinearIndeterminate />;
	}

	return (
		<>
			{uploading ? <LinearIndeterminate /> : null}
			<div className="inputPageContainer">
				<div className="headingContainerEditProduct">
					<h1>Edit Product</h1>
				</div>

				<div className="inputFormContainer">
					<form>
						<TextInputMod
							placeholder="Product ID"
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

				<div className="imageInputContainer">
					<img src={currentImg} alt="current-image" className="currentImage" />
					<input
						className="inputStyle"
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
		</>
	);
};

export default EditProduct;
