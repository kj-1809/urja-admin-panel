import React from "react";
import { BsBoxSeam, BsCart, BsFillPeopleFill } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="imageContainer">
				<img src={require("../assets/urjalogo.png")} className="logoImage" />
			</div>
			<div className="sidebarItemsContainer">
				<Link className="anchorItem" to="/">
					<div className="sidebarItemContainer">
						<BiHome />
						<span className="sidebarItemText">Home</span>
					</div>
				</Link>
				<Link className="anchorItem" to="/orders">
					<div className="sidebarItemContainer">
						<BsBoxSeam />
						<span className="sidebarItemText">Orders</span>
					</div>
				</Link>

				<Link className="anchorItem" to="/products">
					<div className="sidebarItemContainer">
						<BsCart />
						<span className="sidebarItemText">Products</span>
					</div>
				</Link>
				<Link className="anchorItem" to="/users">
					<div className="sidebarItemContainer">
						<BsFillPeopleFill />
						<span className="sidebarItemText">Users</span>
					</div>
				</Link>
			</div>
		</div>
	);
};
