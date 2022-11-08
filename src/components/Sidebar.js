import React from "react";
import { BsBoxSeam, BsCart, BsFillPeopleFill } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import "./Sidebar.css";

export const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="imageContainer">
				<img src={require("../assets/urjalogo.png")} className="logoImage" />
			</div>
			<div className="sidebarItemsContainer">
				<div className="sidebarItemContainer">
					<BiHome />
					<span className="sidebarItemText">Home</span>
				</div>
				<div className="sidebarItemContainer">
					<BsBoxSeam />
					<span className="sidebarItemText">Orders</span>
				</div>
				<div className="sidebarItemContainer">
					<BsCart />
					<span className="sidebarItemText">Products</span>
				</div>
				<div className="sidebarItemContainer">
					<BsFillPeopleFill />
					<span className="sidebarItemText">Users</span>
				</div>
			</div>
		</div>
	);
};
