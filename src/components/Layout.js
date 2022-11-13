import React from "react";
import {Sidebar} from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
	return (
		<div className = "rootContainer">
			<div className="sidebarContainer">
				<Sidebar />
			</div>
			<div className="mainScreen">
        <Outlet />
      </div>
		</div>
	);
};

export default Layout;
