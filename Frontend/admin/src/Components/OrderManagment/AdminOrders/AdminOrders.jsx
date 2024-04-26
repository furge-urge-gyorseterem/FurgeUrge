import { useState, useEffect } from 'react';
import { useMealApi } from '../../../api/MealApi';
import AOrder from './AOrder/AOrder';

const AdminOrders = (props) => {
	const [adatok, setAdatok] = useState([]);
	const { getAdminSzAdat } = useMealApi();
  useEffect(() => {
    const fetchSZadat = async () => {
      try {
        const { data } = await getAdminSzAdat();
        // Rendezés státusz szerint itt történik
        const rendezettData = data.sort((a, b) => {
          const statusPriority = {
            'Futárnál': 1,
            'Futárra vár': 2,
            'Készítése folyamatban': 3,
            'Kiszállítva': 4  // Feltételezve, hogy van ilyen státusz is
          };
          return statusPriority[a.Státusz] - statusPriority[b.Státusz];
        });
        setAdatok(rendezettData);
      } catch (error) {
        console.error('Hiba az adatok betöltésekor:', error);
      }
    };

    fetchSZadat();
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
