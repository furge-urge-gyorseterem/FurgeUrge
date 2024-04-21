import { useEffect, useState } from "react";
import ToDo from "../OrderManagment/WorkerOrders/ToDo/Tabla/ToDo"
import { useMealApi } from "../../api/MealApi";


const Worker = (props) =>{

    const [isChecked, setIsChecked] = useState(false);


	const { getAdminAdat } = useMealApi();
	const [Orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		try {
			const { data } = await getAdminAdat();
			console.log("data:")
			console.log(data);
			
			await setOrders(data);
		} catch (error) {
			console.log(error);
		}
	};
    
	useEffect(() => {
		fetchOrders();
		console.log('megtörtent');
	}, []);


    return(
        <div>
            <ToDo Orders={Orders} fech={fetchOrders}/>
        </div>
    )
}
export default Worker