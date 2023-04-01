import React, { useState, useEffect } from "react";
import "./EditUser.css";
import TextInputMod from "../components/TextInputMod";
import { useParams } from "react-router-dom";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import LinearIndeterminate from "../components/LinearIndeterminate";

const EditUser = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [userData, setUserData] = useState({});
	const [docId, setDocId] = useState("");
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
	const [loading, setLoading] = useState(false);

	async function handleDelete() {
		setLoading(true);
		try{
			await deleteDoc(doc(db, "users", docId));
		}catch(err){
			alert(`some error occured : ${err}`)
		}
		setLoading(false);
		navigate("/users");
	}

	async function handleSubmit() {
		setLoading(true);
		try {
			await updateDoc(doc(db, "users", docId), {
				name: name,
				phone: phone,
				gstin: gstin,
				email: email,
				uid: userId,
				address: address,
				disc5: Number(discount5kg),
				disc47: Number(discount47kg),
				disc19: Number(discount19kg),
				disc430: Number(discount430kg),
			});
		}catch(err){
			alert(`some error occured : ${err}`)
		}
		setLoading(false);
		navigate("/users");
	}

	async function fetchUserData(id) {
		setLoading(true);
		const q = query(collection(db, "users"), where("uid", "==", id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setUserData(doc.data());
			setDocId(doc.id);
		});
		setLoading(false);
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


	if (loading) {
		return <LinearIndeterminate />;
	}

	return (
		<div className="inputPageContainer">
			<div className="headingContainerEditUser">
				<h1>Edit User</h1>
			</div>

			<div className="inputFormContainer">
				<form>
					<TextInputMod
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled = {true}
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
						disabled = {true}
					/>
					<TextInputMod
						placeholder="UserID"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						disabled = {true}
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
				<button className="submitButton" onClick={handleSubmit}>
					Submit
				</button>
				<button className="deleteUserButton" onClick={handleDelete}>
					Delete User
				</button>
			</div>
		</div>
	);
};

export default EditUser;
