import React from "react";
import "./TextInputMod.css";
const TextInputMod = (props) => {
	return (
		<div className="inputFieldContainer">
			<div className = "inputLabelComponent">
				<h4>{props.placeholder} : </h4>
			</div>
			<div className = "inputFieldComponent">
				<input
					className="inputField"
					onChange={props.onChange}
					value={props.value}
					disabled = {props.disabled}
				/>
			</div>
		</div>
	);
};

export default TextInputMod;
