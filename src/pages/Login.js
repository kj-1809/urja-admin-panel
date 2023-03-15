import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import "./Login.css";

import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth, useUpdateAuth } from "../context/AuthContext";
import LinearIndeterminate from "../components/LinearIndeterminate" 

const Login = (props) => {
	// const [currentUser , setCurrentUser] = useState(null)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading , setLoading] = useState(false);
	const updateIsAdmin = useUpdateAuth();

	async function fetchUserData(userId) {
		const q = query(collection(db, "users"), where("uid", "==", userId));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.size == 0) {
			alert("incorrect id or pass");
		}
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			if (!doc.data().admin) {
			}
			updateIsAdmin(doc.data().isAdmin);
		});
	}
	const handleSubmit = () => {
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await fetchUserData(user.uid);
				setLoading(false)
			})
			.catch((error) => {
				const errorCode = error.code;
				setLoading(false)
			});
	};

	if(loading){
		return <LinearIndeterminate />;
	}

	return (
		<div className="loginContainer">
			<div className="loginCard">
				<div className="imageContainer">
					<img src={require("../assets/urjalogo.png")} className="logoImage" />
				</div>
				<h1 className="headingText">Login</h1>
				<div className="loginInputContainer">
					<TextInput
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						size = "small"
					/>
					<TextInput
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						size = "small"
						secureTextEntry={true}
					/>
				</div>
				<div className="loginButtonContainer">
					<CustomButton onClick={handleSubmit}>Login</CustomButton>
				</div>
			</div>
		</div>
	);
};

export default Login;
