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

	const updateIsAdmin = useUpdateAuth()

	async function fetchUserData(userId) {
		const q = query(collection(db, "users"), where("uid", "==", userId));
		const querySnapshot = await getDocs(q);
		if(querySnapshot.size == 0){
			alert("incorrect id or pass")
		}
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			if(!doc.data().admin){
			}
			updateIsAdmin(doc.data().isAdmin)
		});
	}
	const handleSubmit = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				fetchUserData(user.uid);
			})
			.catch((error) => {
				const errorCode = error.code;
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
