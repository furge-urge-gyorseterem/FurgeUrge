import './Users.css';
import { useMealApi } from '../../../api/MealApi';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Row, Col, Button } from 'react-bootstrap';

function Costumers() {
    const [customers, setCustomers] = useState([]);
    const [customerKeys, setCustomerKeys] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showEditCustomer, setShowEditCustomer] = useState(false);
    const fields = ['name', 'Telefonszám', 'Lakcím']; 
    const { getcostumers, updateCustomer } = useMealApi(); 

    const fetchCustomers = async () => {
        try {
            const { data } = await getcostumers();
            setCustomers(data.customers);
            setCustomerKeys(Object.keys(data.customers[0]).filter((key) => fields.includes(key)));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowEditCustomer(true);
    };

    const handleSave = async () => {
        try {
            await updateCustomer(editingCustomer); 
            setShowEditCustomer(false);
            fetchCustomers(); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Users">
            <Table striped borderless hover size="m" variant="dark">
                <thead>
                    <tr>
                        {customerKeys.map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            {customerKeys.map((key) => (
                                <td key={key}>{customer[key]}</td>
                            ))}
                            <td>
                                <button className='e' onClick={() => handleEdit(customer)}>Szerkeszt</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Offcanvas show={showEditCustomer} onHide={() => setShowEditCustomer(false)} placement="end" style={{ backgroundColor: '#258037' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Szerkesztés</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Neve</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={editingCustomer && editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Telefonszáma</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone" defaultValue={editingCustomer && editingCustomer.Telefonszám} onChange={(e) => setEditingCustomer({ ...editingCustomer, Telefonszám: e.target.value })} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Lakcíme</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" defaultValue={editingCustomer && editingCustomer.Lakcím} onChange={(e) => setEditingCustomer({ ...editingCustomer, Lakcím: e.target.value })} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Státusza</Form.Label>
                                <Form.Select defaultValue={editingCustomer && editingCustomer.Státusz} onChange={(e) => setEditingCustomer({ ...editingCustomer, Státusz: e.target.value })}>
                                    <option value="Dolgozó">Dolgozó</option>
                                    <option value="Futár">Futár</option>
                                    <option value="Vásárló">Vásárló</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Button
                            variant="success"
                            style={{
                                background: '#7FFF00',
                                color: 'black',
                                transition: 'background-color 0.3s'
                            }}
                            onClick={handleSave}
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

export default Costumers;
