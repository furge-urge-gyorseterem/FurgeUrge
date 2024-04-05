import './Users.css';
import { useMealApi } from '../../../api/MealApi';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

function Users() {
	const [Worker, setWorker] = useState([]);
	const [workerKey, setworkerKey] = useState([]);
	const szures = ['name', 'Telefonszám', 'Lakcím', 'Státusz'];

	const { getWorkers } = useMealApi();

	const fetchWorkers = async () => {
		try {
			const { data } = await getWorkers();
			setWorker(data);

			setworkerKey(Object.keys(data[0]).filter((key) => szures.includes(key)));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWorkers();
	}, []);

	return (
		<div className="Users">
			<Table striped borderless hover size="m" variant="dark">
				<thead>
					<tr>
						{workerKey.map((key) => (
							<th key={key}>{key}</th>
						))}
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{Worker.map((member, index) => (
						<React.Fragment key={index}>
							<tr>
								{workerKey.map((key) => {
									return <td key={key}>{member[key]}</td>; 
								})}
								<td>
									<button className='e'>edit</button> <button className='d'>delete</button>
								</td>
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Users;
