/* eslint-disable react-hooks/exhaustive-deps */
import './U-CMtool.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Users from '../Users/Users';
import Costumers from '../Costumers/Costumers';

const UCMtool = () => {
	return (
		<div className="UCMtool">
			<Tabs>
				<TabList className="costumTablist">
					<Tab className="costumTab">Dolgozók</Tab>
					<Tab className="costumTab">Ügyfelek</Tab>
				</TabList>

				<TabPanel>
					<Users />
				</TabPanel>
				<TabPanel>
					<Costumers/>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default UCMtool;
