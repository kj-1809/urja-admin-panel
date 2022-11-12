import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Home  from "./pages/Home"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import Users from "./pages/Users"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import EditUser from "./pages/EditUser"
import {Routes , Route} from 'react-router-dom'

function App() {
	return (
		<div className="rootContainer">
			<div className = "sidebarContainer">
				<Sidebar />
			</div>
      
			<div className="mainScreen">
				<Routes>
					<Route path = '/' element = {<Home />}/>
					<Route path = '/orders' element = {<Orders />}/>
					<Route path = '/products' element = {<Products />}/>
					<Route path = '/users' element = {<Users />}/>
					<Route path = '/addproduct' element = {<AddProduct />} />
					<Route path = '/editproduct' element = {<EditProduct />} />
					<Route path = '/edituser' element = {<EditUser />}/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
