import './Users.css';
import { useMealApi } from '../../../api/MealApi';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Row, Col, Button } from 'react-bootstrap';

function Users() {
	const [workers, setWorkers] = useState([]);
	const [workerKeys, setWorkerKeys] = useState([]);
	const [editingWorker, setEditingWorker] = useState(null);
	const [showEditUser, setShowEditUser] = useState(false);
	const szures = ['name', 'Telefonszám', 'Lakcím', 'Státusz'];
	const { getWorkers } = useMealApi();

	const fetchWorkers = async () => {
		try {
			const { data } = await getWorkers();
			setWorkers(data);
			setWorkerKeys(Object.keys(data[0]).filter((key) => szures.includes(key)));
		} catch (error) {
			console.log(error);
		}
	};
	const hide=()=>{ setShowEditUser(false)}

	useEffect(() => {
		fetchWorkers();
	}, []);

	const handleEdit = (worker) => {
		setEditingWorker(worker);
		setShowEditUser(true); // Megnyitjuk az off-canvas ablakot
	};

	return (
		<div className="Users">
			<Table striped borderless hover size="m" variant="dark">
				<thead>
					<tr>
						{workerKeys.map((key) => (
							<th key={key}>{key}</th>
						))}
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{workers.map((worker, index) => (
						<tr key={index}>
							{workerKeys.map((key) => (
								<td key={key}>{worker[key]}</td>
							))}
							<td>
								<button className="e" onClick={() => handleEdit(worker)}>
									Szerkeszt
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Offcanvas show={showEditUser} onHide={() => setShowEditUser(false)} placement="end" style={{ backgroundColor: '#258037' }}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Szerkesztés</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Form>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridName">
								<Form.Label>Neve</Form.Label>
								<Form.Control type="text" placeholder="Enter name" defaultValue={editingWorker && editingWorker.name} />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridPhone">
								<Form.Label>Telefonszáma</Form.Label>
								<Form.Control type="text" placeholder="Enter phone" defaultValue={editingWorker && editingWorker.Telefonszám} />
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridAddress">
								<Form.Label>Lakcíme</Form.Label>
								<Form.Control type="text" placeholder="Enter address" defaultValue={editingWorker && editingWorker.Lakcím} />
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridStatus">
								<Form.Label>Státusza</Form.Label>
								<Form.Select defaultValue={editingWorker && editingWorker.Státusz}>
									<option value="Dolgozó">Dolgozó</option>
									<option value="Futár">Futár</option>
									<option value="Vásárló">Vásárló</option>
								</Form.Select>
							</Form.Group>
						</Row>
						<Button
							variant="success"
							onClick={ hide}
							style={{
								background: '#7FFF00',
								color: 'black',
								transition: 'background-color 0.3s'
							}}
							onMouseEnter={(e) => {
								e.target.style.backgroundColor = '#32CD32';
							}}
							onMouseLeave={(e) => {
								e.target.style.backgroundColor = '#7FFF00';
							}}
						>
							Mentés
						</Button>
					</Form>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default Users;
