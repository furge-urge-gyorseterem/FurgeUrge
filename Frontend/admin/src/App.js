import DMTool from './Components/MealManagment/DishManagmentTool/DMTool';
import NNosh from './Components/MealManagment/NextNosh/NNosh';
import Users from './Components/UserManagment/Users/Users';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import VNBAR from './Components/VerticalNavBar/VNBar';
import Dashboard from './Components/dasboard/Dashbord';
import OrderManagmentTool from './Components/OrderManagment/OrderManagmentTool';
import UCMtool from './Components/UserManagment/U-CMTool/U-CMtool';

function App() {
	return (
		<div className="App">
			
			<VNBAR />
		

			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/meals" element={<DMTool />} />
				<Route path="/users" element={<UCMtool />} />
				<Route path="/orders" element={<OrderManagmentTool />} />
			</Routes>
		</div>
	);
}

export default App;
