import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import OrderManagmentTool from './Components/OrderManagment/OrderManagmentTool';
import UCMtool from './Components/UserManagment/U-CMTool/U-CMtool';
import Dashboard from './Components/dasboard/Dashbord';
import VNBAR from './Components/VerticalNavBar/VNBar';
import DMTool from './Components/MealManagment/DishManagmentTool/DMTool';
import { useState } from 'react';
import Worker from './Components/worker/Worker';

const App = () => {
		const userStatus='Dolgozó'
		let routes;

    switch (userStatus) {
        case 'Admin':
            routes = (
                <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/meals" element={<DMTool />} />
                    <Route path="/users" element={<UCMtool />} />
                    <Route path="/orders" element={<OrderManagmentTool state={userStatus} />} />
                </>
            );
            break;
        case 'Dolgozó':
            routes = (
                <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/meals" element={<DMTool />} />
                    <Route path="/Worker" element={<Worker />} />
                </>
            );
            break;
        case 'Futár':
            routes = (
                <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<OrderManagmentTool state={userStatus}/>} />
                </>
            );
            break;
        default:
            routes = (
                <Route path="/" element={<Dashboard />} />
            );
            break;
    }

    return (
        <div className="App">
            <VNBAR name="Rixi" userStatus={userStatus}/>
            <Routes>
                {routes}
            </Routes>
        </div>
    );
}

export default App;
