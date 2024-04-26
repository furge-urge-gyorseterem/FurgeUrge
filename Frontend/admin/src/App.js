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
    const [activeRank, setActiveRank] = useState(1);
    const [user, setuser] = useState([])
    const { getuser} = useMealApi();
    
    const [userId, setUserId] = useState(null);

    const rangok=[{rang:1,value:'Admin'},{rang:2,value:'Dolgozó'},{rang:3,value:'Futár'}]
        const aktRang=activeRank
		const userStatus= rangok.find(rang => rang.rang === aktRang).value;

		let routes;
    



    const fetchUser=async()=>{
        try{
            const {data}= await getuser(userId);
            console.log("data:")
            console.log(data)
           await setuser(data)
        }
        catch(error){
            console.log(error)
        }
    }





        useEffect(() => {
            // URL paraméterek kiolvasása
            const queryParams = new URLSearchParams(location.search);
            const id = queryParams.get('id'); // 'id' paraméter kiolvasása
            if (id) {
                setUserId(id); // Beállítja az állapotot, ha van ID
            
            }
        }, [location]);
        useEffect(() => {
            if (userId) {
                console.log("A userId frissült: ", userId)

            }
            fetchUser();
        }, [userId]);

    
                

    switch (userStatus) {
        case 'Admin':
            routes = (
                <>
                    <Route path="/" element={<Dashboard set={setActiveRank}/>} />
                    <Route path="/meals" element={<DMTool />} />
                    <Route path="/users" element={<UCMtool />} />
                    <Route path="/orders" element={<OrderManagmentTool state={userStatus} />} />
                </>
            );
            break;
        case 'Dolgozó':
            routes = (
                <>
                    <Route path="/" element={<Dashboard set={setActiveRank} />} />
                    <Route path="/meals" element={<DMTool />} />
                    <Route path="/Worker" element={<Worker />} />
                </>
            );
            break;
        case 'Futár':
            routes = (
                <>
                    <Route path="/" element={<Dashboard set={setActiveRank} />} />
                    <Route path="/orders" element={<OrderManagmentTool state={userStatus}/>} />
                </>
            );
            break;
        default:
            routes = (
                <Route path="/" element={<Dashboard set={setActiveRank} />} />
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
