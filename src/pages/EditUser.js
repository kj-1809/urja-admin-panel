import React  , {useState , useEffect } from "react";
import "./EditUser.css";
import TextInput from "../components/TextInput";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const EditUser = () => {
	const { id } = useParams();
	console.log("id : ", id);

	const [userData , setUserData] = useState({})

	async function fetchUserData(id) {
		const q = query(
			collection(db, "users"),
			where("uid", "==", id)
		);
		const querySnapshot = await getDocs(q);
		console.log("size : ", querySnapshot.size);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setUserData(doc.data());
		});
	}

	useEffect(() => {
		fetchUserData(id);
	}, []);

	console.log("User Data : ");
	console.log(userData);

	return (
		<div className="editUserContainer">
			<div className="headingContainerEditUser">
				<h1>Edit User</h1>
			</div>

			<div>
				<form>
					<TextInput placeholder="Name" />
					<TextInput placeholder="Phone" />
					<TextInput placeholder="GSTIN" />
					<TextInput placeholder="Email" />
					<TextInput placeholder="UserID" />
					<TextInput placeholder="Address" />
					<TextInput placeholder="Discount 5KG" />
					<TextInput placeholder="Discount 19KG" />
					<TextInput placeholder="Discount 47KG" />
					<TextInput placeholder="Discount 430KG" />
				</form>
			</div>
			<div className="buttonContainerEditUser">
				<button className="submitButton">Submit</button>
				<button className="deleteUserButton">Delete User</button>
			</div>
		</div>
	);
};

export default EditUser;
