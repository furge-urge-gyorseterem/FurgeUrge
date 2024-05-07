import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import OrderManagmentTool from './Components/OrderManagment/OrderManagmentTool';
import UCMtool from './Components/UserManagment/U-CMTool/U-CMtool';
import Dashboard from './Components/dasboard/Dashbord';
import VNBAR from './Components/VerticalNavBar/VNBar';
import DMTool from './Components/MealManagment/DishManagmentTool/DMTool';
import { useEffect, useState } from 'react';
import Worker from './Components/worker/Worker';
import { useMealApi } from './api/MealApi';

const App = () => {
	const location = useLocation();
	const [activeRank, setActiveRank] = useState(null);
	const [user, setUser] = useState({});
	const [userId, setUserId] = useState(null);
	const userRealRank=user.status
	const { getuser } = useMealApi();

	const fetchUser = async (id) => {
		try {
			const { data } = await getuser(id);
			console.log('Fetched user data:', data);
			setUser(data);
			setActiveRank(data.status);
			localStorage.setItem('currentUser', JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// Extract userId from URL query parameters
		localStorage.clear();
		const queryParams = new URLSearchParams(location.search);
		const idFromParams = queryParams.get('id');

		if (idFromParams) {
			setUserId(idFromParams);
		}

		const storedUser = localStorage.getItem('currentUser');
		if (storedUser) {
			const userObj = JSON.parse(storedUser);
			setUser(userObj);
			setActiveRank(userObj.status);
			
		} else if (idFromParams) {
			console.log('Fetching user data from API, UserID:', idFromParams);
			fetchUser(idFromParams);
		}
	}, [location]);
    

console.log(userRealRank)
	let routes;

	switch (activeRank) {
		case 'Admin':
			routes = (
				<>
					<Route path="/" element={<Dashboard set={setActiveRank} realRank={userRealRank} />} />
					<Route path="/meals" element={<DMTool />} />
					<Route path="/users" element={<UCMtool />} />
					<Route path="/orders" element={<OrderManagmentTool state={activeRank} id={userId} realRank={userRealRank} />} />
				</>
			);
			break;
		case 'Dolgozó':
			routes = (
				<>
					<Route path="/" element={<Dashboard set={setActiveRank} realRank={userRealRank} />} />
					<Route path="/meals" element={<DMTool />} />
					<Route path="/Worker" element={<Worker />} />
				</>
			);
			break;
		case 'Futár':
			routes = (
				<>
					<Route path="/" element={<Dashboard set={setActiveRank} realRank={userRealRank} />} />
					<Route path="/orders" element={<OrderManagmentTool state={activeRank} id={userId} realRank={userRealRank} />} />
				</>
			);
			break;
		default:
			routes = <Route path="/" element={<Dashboard set={setActiveRank} realRank={userRealRank} />} />;
			break;
	}

	return (
		<div className="App">
			<VNBAR name={user.name || ''} userStatus={activeRank || ''} />
			<Routes>{routes}</Routes>
		</div>
	);
};

export default App;
