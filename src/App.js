import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Users from "./pages/Users";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth,db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import {useAuth , useUpdateAuth} from "./context/AuthContext"

function App() {
	const currentState = useAuth()
	// const updateCurrentState = useUpdateAuth()

	console.log("currentState :: " , currentState)

	function RequireAuth(props) {
		return currentState ? props.children : <Navigate to="/login" />;
	}
	function RequireAuthRev(props) {
		return !currentState ? props.children : <Navigate to="/" />;
	}

	return (
		<div className="rootContainer">
			<Routes>
				<Route
					path="/login"
					element={
						<RequireAuthRev>
							<Login />
						</RequireAuthRev>
					}
				/>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="/orders"
						element={
							<RequireAuth>
								<Orders />
							</RequireAuth>
						}
					/>
					<Route
						path="/products"
						element={
							<RequireAuth>
								<Products />
							</RequireAuth>
						}
					/>
					<Route
						path="/users"
						element={
							<RequireAuth>
								<Users />
							</RequireAuth>
						}
					/>
					<Route
						path="/addproduct"
						element={
							<RequireAuth>
								<AddProduct />
							</RequireAuth>
						}
					/>
					<Route
						path="/editproduct"
						element={
							<RequireAuth>
								<EditProduct />
							</RequireAuth>
						}
					/>
					<Route
						path="/edituser"
						element={
							<RequireAuth>
								<EditUser />
							</RequireAuth>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
