import "./App.css";
import { Sidebar } from "./components/Sidebar";
import {Card} from "./components/Card"

function App() {
	return (
		<div className="rootContainer">
			<div className = "sidebarContainer">
				<Sidebar />
			</div>
      
			<div className="mainScreen">
				<Card />
				<h1>Hey there</h1>
			</div>
		</div>
	);
}

export default App;
