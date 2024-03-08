import './Users.css';
import { useMealApi } from '../../../api/MealApi';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

function Users() {
	const [Worker, setWorker] = useState([]);
	const [workerKey, setworkerKey] = useState([]);

	const { getWorkers } = useMealApi();

	const fetchWorkers = async () => {
		try {
			const { data } = await getWorkers();
			setWorker(data);
			setworkerKey(Object.keys(data[0]));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWorkers();
	}, []);

	return (
		<div className="Users">
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						{workerKey.map((key) => (
							<th key={key}>{key}</th>

						))}
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{Worker.map((members, index) => (
						<>
							<tr key={index}>
								{workerKey.map((data, i) => {
									return (
										<>
											<td key={i}>{members[data] !== null ? members[data] : ''}</td>
										</>
									);
								}
								)}
								<td>
									<button>edit</button> <button>delete</button>
								</td>
							</tr>
							
						</>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Users;
