import React, { useState, useEffect } from "react";
import "./EditUser.css";
import TextInput from "../components/TextInput";
import TextInputMod from "../components/TextInputMod"
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs,  doc , updateDoc , deleteDoc} from "firebase/firestore";
import { db,auth } from "../firebase";
import { useNavigate } from "react-router-dom";


const EditUser = () => {
	const { id } = useParams();
	console.log("id : ", id);
	const navigate = useNavigate()
	const [userData, setUserData] = useState({});
	const [docId , setDocId] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [gstin, setGstin] = useState("");
	const [email, setEmail] = useState("");
	const [userId, setUserId] = useState("");
	const [address, setAddress] = useState("");
	const [discount5kg, setDiscount5kg] = useState(0);
	const [discount47kg, setDiscount47kg] = useState(0);
	const [discount19kg, setDiscount19kg] = useState(0);
	const [discount430kg, setDiscount430kg] = useState(0);

	async function handleDelete(){
		await deleteDoc(doc(db,"users",docId))
		console.log("user Deleted successfully")
	}

	async function handleSubmit(){
		await updateDoc(doc(db, "users", docId), {
			name: name,
			phone: phone,
			gstin: gstin,
			email: email,
			uid: userId,
			address: address,
			disc5: discount5kg,
			disc47: discount47kg,
			disc19: discount19kg,
			disc430: discount430kg,
		});
		console.log("User Update successful")
		navigate('/users')
	}

	async function fetchUserData(id) {
		const q = query(collection(db, "users"), where("uid", "==", id));
		const querySnapshot = await getDocs(q);
		console.log("size : ", querySnapshot.size);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setUserData(doc.data());
			setDocId(doc.id)
		});
	}

	useEffect(() => {
		fetchUserData(id);
	}, []);

	useEffect(() => {
		setName(userData.name);
		setPhone(userData.phone);
		setGstin(userData.gstin);
		setEmail(userData.email);
		setUserId(userData.uid);
		setAddress(userData.address);
		setDiscount5kg(userData.disc5);
		setDiscount47kg(userData.disc47);
		setDiscount19kg(userData.disc19);
		setDiscount430kg(userData.disc430);
	}, [userData]);

	console.log("User Data : ");
	console.log(userData);

	return (
		<div className="editUserContainer">
			<div className="headingContainerEditUser">
				<h1>Edit User</h1>
			</div>

			<div>
				<form>
					<TextInputMod
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextInputMod
						placeholder="Phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<TextInputMod
						placeholder="GSTIN"
						value={gstin}
						onChange={(e) => setGstin(e.target.value)}
					/>
					<TextInputMod
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextInputMod
						placeholder="UserID"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
					/>
					<TextInputMod
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<TextInputMod
						placeholder="Discount 5KG"
						value={discount5kg}
						onChange={(e) => setDiscount5kg(e.target.value)}
					/>
					<TextInputMod
						placeholder="Discount 19KG"
						value={discount19kg}
						onChange={(e) => setDiscount19kg(e.target.value)}
					/>
					<TextInputMod
						placeholder="Discount 47KG"
						value={discount47kg}
						onChange={(e) => setDiscount47kg(e.target.value)}
					/>
					<TextInputMod
						placeholder="Discount 430KG"
						value={discount430kg}
						onChange={(e) => setDiscount430kg(e.target.value)}
					/>
				</form>
			</div>
			<div className="buttonContainerEditUser">
				<button className="submitButton" onClick={handleSubmit}>Submit</button>
				<button className="deleteUserButton" onClick = {handleDelete}>Delete User</button>
			</div>
		</div>
	);
};

export default EditUser;
