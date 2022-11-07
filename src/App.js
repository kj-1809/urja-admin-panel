import "./App.css";
import { Sidebar } from "./components/Sidebar";

function App() {
	return (
		<div className="rootContainer">
      <Sidebar />
			<div className="mainScreen"></div>
		</div>
	);
}

export default App;
