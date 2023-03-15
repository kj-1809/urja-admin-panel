import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import CustomButton from "../components/CustomButton";
import "./Login.css";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LinearIndeterminate from "../components/LinearIndeterminate" 
const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading , setLoading] = useState(false);

	const handleSubmit = () => {
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				setLoading(false)
			})
			.catch((error) => {
				alert("Invalid Username or Password !")
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
