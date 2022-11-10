import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home"


function App() {
	return (
		<div className="rootContainer">
			<div className = "sidebarContainer">
				<Sidebar />
			</div>
      
			<div className="mainScreen">
				<Home />
			</div>
		</div>
	);
}

export default App;
