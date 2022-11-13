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
import Layout from "./components/Layout"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
	const [currentUser, setCurrentUser] = useState(false);
	return (
		<div className="rootContainer">
			<Routes>
				<Route path = '/login' element = {<Login />}/>
				<Route path = "/" element = {<Layout />}>
					<Route index element = {<Home />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/products" element={<Products />} />
					<Route path="/users" element={<Users />} />
					<Route path="/addproduct" element={<AddProduct />} />
					<Route path="/editproduct" element={<EditProduct />} />
					<Route path="/edituser" element={<EditUser />} />
				</Route>
			</Routes>

		</div>
	);
}

export default App;
