import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import "./Login.css";

import { auth, db } from "../firebase";
import {
	signInWithEmailAndPassword,
	signOut,
	verifyBeforeUpdateEmail,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	// const [currentUser , setCurrentUser] = useState(null)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [val, setVal] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (val) {
			console.log("success");
			navigate("/");
		} else {
			console.log("fail");
		}
	}, [val]);

	async function fetchUserData(userId) {
		const q = query(collection(db, "users"), where("uid", "==", userId));
		const querySnapshot = await getDocs(q);
		console.log("Data fetched successfully");
		await querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			setVal(doc.data().isAdmin);
		});
	}
	const handleSubmit = () => {
		console.log("Pressed");
		// log user in and check if the user is an admin
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log("User logged in successfully");
				//fetch user data from firestore
				fetchUserData(user.uid);
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(error.message);
			});
	};
	return (
		<div className="loginContainer">
			<h1>Login</h1>
			<TextInput
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextInput
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<CustomButton onClick={handleSubmit}>Login</CustomButton>
		</div>
	);
};

export default Login;
