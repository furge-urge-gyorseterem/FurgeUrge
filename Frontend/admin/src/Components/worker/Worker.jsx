import { useEffect, useState } from "react";
import ToDo from "../OrderManagment/WorkerOrders/ToDo/Tabla/ToDo"
import { useMealApi } from "../../api/MealApi";


const Worker = (props) =>{

    const [isChecked, setIsChecked] = useState(false);


	const { getAdminSzAdat } = useMealApi();
	const [Orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		try {
			const { data } = await getAdminSzAdat();
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
		console.log(Orders)
	}, []);


    return(
        <div>
            <ToDo Orders={Orders} fech={fetchOrders}/>
        </div>
    )
}
export default Worker