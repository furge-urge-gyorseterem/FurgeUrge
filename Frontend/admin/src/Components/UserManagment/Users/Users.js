import './Users.css';
import { useMealApi } from '../../../api/MealApi';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Row, Col, Button } from 'react-bootstrap';

function Users() {
    const [workers, setWorkers] = useState([]);
    const [workerKeys, setWorkerKeys] = useState([]);
    const [editingWorker, setEditingWorker] = useState(null);
    const [formState, setFormState] = useState({}); // Hold form state
    const [showEditUser, setShowEditUser] = useState(false);
    const szures = ['name', 'Telefonszám', 'Lakcím', 'Státusz'];
    const { getWorkers } = useMealApi();

    const fetchWorkers = async () => {
        try {
            const { data } = await getWorkers();
            // Filter out workers with "Admin" status
            const filteredWorkers = data.filter((worker) => worker.Státusz !== 'Admin');
            setWorkers(filteredWorkers);
            // Update worker keys while excluding any fields you don't want
            setWorkerKeys(Object.keys(filteredWorkers[0]).filter((key) => szures.includes(key)));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWorkers();
    }, []);

    const handleEdit = (worker) => {
        setEditingWorker(worker);
        setFormState(worker); // Initialize form state with the worker's data
        setShowEditUser(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!editingWorker) return;

        setWorkers((prevWorkers) =>
            prevWorkers.map((worker) =>
                worker === editingWorker ? { ...worker, ...formState } : worker
            )
        );
        setShowEditUser(false);
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
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    value={formState.name || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Telefonszáma</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone"
                                    name="Telefonszám"
                                    value={formState.Telefonszám || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Lakcíme</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter address"
                                    name="Lakcím"
                                    value={formState.Lakcím || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Státusza</Form.Label>
                                <Form.Select
                                    name="Státusz"
                                    value={formState.Státusz || 'Dolgozó'}
                                    onChange={handleInputChange}
                                >
                                    {['Dolgozó', 'Futár', 'Vásárló'].map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Button
                            variant="success"
                            onClick={handleSave}
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
