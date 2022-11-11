import "./App.css";
import { Sidebar } from "./components/Sidebar";
import Home  from "./pages/Home"
import Orders from "./pages/Orders"
import Products from "./pages/Products"
import Users from "./pages/Users"
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
				</Routes>
			</div>
		</div>
	);
}

export default App;
