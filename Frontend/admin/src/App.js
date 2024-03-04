import './App.css';
import DMTool from './Components/MealManagment/DishManagmentTool/DMTool';
import NNosh from './Components/MealManagment/NextNosh/NNosh';

import VNBAR from './Components/VerticalNavBar/VNBar';

function App() {
	return (
		<div className="App">
			<VNBAR />
			<DMTool />
		</div>
	);
}

export default App;
