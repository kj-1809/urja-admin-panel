import React , {useEffect , useState} from "react";
import "./EditProduct.css";
import TextInput from "../components/TextInput";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const EditProduct = () => {
	const { id } = useParams();
	console.log("id : ", id);

	const [productData, setProductData] = useState({});

	async function fetchProductData(id) {
		const q = query(collection(db, "products"), where("productId", "==", Number(id)));
		const querySnapshot = await getDocs(q);
		console.log("size : " , querySnapshot.size)
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setProductData(doc.data())
		});
	}

	useEffect(() => {
		fetchProductData(id)
	}, [])

	console.log("productData : ")
	console.log(productData)
	

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
