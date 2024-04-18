/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './OrderManagmentTool.css';
import { useMealApi } from '../../api/MealApi';
import AdminOrders from './AdminOrders/AdminOrders';
import WorkOrders from './WorkerOrders/OM';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const OrderManagmentTool = () => {
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

	//efectek

	useEffect(() => {
		fetchOrders();
		console.log('megtörtent');
	}, [isChecked]);

	return (
		<div>
			<div>
				<h1>Admin Üzem Mód</h1>
				<Tabs>
					<TabList className="costumTablist">
						<Tab className="costumTab">Összes</Tab>
					</TabList>

					<TabPanel>
						<AdminOrders Orders={Orders} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default OrderManagmentTool;
