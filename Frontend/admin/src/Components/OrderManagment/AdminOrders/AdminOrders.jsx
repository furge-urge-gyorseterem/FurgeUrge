import { useState, useEffect } from 'react';
import { useMealApi } from '../../../api/MealApi';
import AOrder from './AOrder/AOrder';

const AdminOrders = (props) => {
  const [adatok, setadatok] = useState([]);
  const {getAdminSzAdat} = useMealApi();
	useEffect(() => {
		const fetchSZadat = async () => {
			try {
				const {data} = await getAdminSzAdat();
				console.log('data:')
				console.log(data)
				setadatok(data);
			} catch (error) {
				console.error('Hiba az opciók betöltésekor:', error);
			}
		};

		fetchSZadat();
		console.log(adatok)
	}, []);


	return (
        <div className="AdminOrders">
        {adatok.map((item,index) => (
        
          <AOrder rendeles={item} key={index} state={props.state} fetch={props.fetch} ></AOrder>
        ))}
      </div>
	);
};

export default AdminOrders;
