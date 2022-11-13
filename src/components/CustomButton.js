import React from "react";
import "./CustomButton.css"

const CustomButton = (props) => {
	return <button className = "customButtonStyle">{props.children}</button>;
};

export default CustomButton;
