/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './OrderManagmentTool.css';
import { useMealApi } from '../../api/MealApi';
import AdminOrders from './AdminOrders/AdminOrders';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const OrderManagmentTool = (props) => {
	const [isChecked, setIsChecked] = useState(false);


	const { getAdminAdat } = useMealApi();
	const [Orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		try {
			const { data } = await getAdminAdat();
			console.log(data);
			await setOrders(data);
		} catch (error) {
			console.log(error);
		}
	};



	useEffect(() => {
		fetchOrders();
		console.log('megtörtent');
	}, [isChecked]);

	return (
		<div>
			<div>
				<Tabs>
					<TabList className="costumTablist">
						<Tab className="costumTab">Összes</Tab>
					</TabList>
					<TabPanel>
						<AdminOrders Orders={Orders} state={props.state} fetch={fetchOrders} id={props.id} realRank={props.realRank}/>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default OrderManagmentTool;
