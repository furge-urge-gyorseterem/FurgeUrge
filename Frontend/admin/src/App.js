import DMTool from './Components/MealManagment/DishManagmentTool/DMTool';
import NNosh from './Components/MealManagment/NextNosh/NNosh';
import Users from './Components/UserManagment/Users/Users';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import VNBAR from './Components/VerticalNavBar/VNBar';
import Dashboard from './Components/dasboard/Dashbord';
import OrderManagmentTool from './Components/OrderManagment/OrderManagmentTool';

function App() {
	return (
		<div className="App">
			
			<VNBAR />
			<label class="switch">
				<input type="checkbox" />
				<span class="slider round"></span>
			</label>

			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/meals" element={<DMTool />} />
				<Route path="/users" element={<Users />} />
				<Route path="/orders" element={<OrderManagmentTool />} />
			</Routes>
		</div>
	);
}

export default App;
