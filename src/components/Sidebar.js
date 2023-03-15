import React from "react";
import { BsBoxSeam, BsCart, BsFillPeopleFill,BsDoorOpen } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {auth} from "../firebase"
import { signOut } from "firebase/auth";
export const Sidebar = () => {

	const handleSignOut = () => {
		signOut(auth).then(() => {
			console.log("Sign Out successful")
		}).catch((error) => {
			alert("Some error occurred !" , error)
		})
	}

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
				<div className="sidebarItemContainer" onClick = {handleSignOut}>
					<BsDoorOpen />
					<span className="sidebarItemText">Sign Out</span>
				</div>
			</div>
		</div>
	);
};
