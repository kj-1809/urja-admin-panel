import React from "react";
import "./TextInput.css";
const TextInput = (props) => {
	return (
		<div className="inputFieldContainer">
			<input
				className="inputField"
				placeholder={props.placeholder}
				onChange={props.onChange}
				value={props.value}
				style={props.size == "small" ? { width: "300px", marginLeft: "0px" } : {}}
				type={props.secureTextEntry ? "password" : ""}
			/>
		</div>
	);
};

export default TextInput;
