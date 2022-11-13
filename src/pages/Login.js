import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import "./Login.css";

import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth , useUpdateAuth } from "../context/AuthContext";

const Login = (props) => {
	// const [currentUser , setCurrentUser] = useState(null)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	const currentStatus = useAuth()
	const updateCurrentStatus = useUpdateAuth()

	useEffect(()=>{
		if(currentStatus){
			console.log("Rec")
			navigate('/')
		}
	} , [currentStatus])

	async function fetchUserData(userId) {
		const q = query(collection(db, "users"), where("uid", "==", userId));
		const querySnapshot = await getDocs(q);
		console.log("Data fetched successfully");
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log("isAdmin" , doc.data().isAdmin)
			updateCurrentStatus(doc.data().isAdmin)
		});
	}
	const handleSubmit = () => {
		console.log("Pressed");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("User logged in successfully");
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
