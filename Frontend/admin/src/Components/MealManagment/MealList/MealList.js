import { useState, useEffect } from 'react';
import Meal from '../Meal/Meal';

import { Offcanvas, Button, Form, Row, Col } from 'react-bootstrap';
import { useMealApi } from '../../../api/MealApi';

const MealList = (props) => {
	const [meals, setMeals] = useState([]);
	const [query, setQuery] = useState('');
	const [showAddForm, setShowAddForm] = useState(false);
	const { newfood } = useMealApi();

	const getFilteredMeals = () => {
		if (!query) {
			return props.meals;
		}
		return props.meals.filter((foodname) => foodname.Elnevezes.toLowerCase().includes(query.toLowerCase()));
	};

	useEffect(() => {
		setMeals(getFilteredMeals());
	}, [query, props.meals]);

	const toggleAddForm = () => {
		setShowAddForm(!showAddForm);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await newfood({
				Elnevezes: e.target.Elnevezes.value,
				Etelkategoria: e.target.Etelkategoria.value,
				Ar: e.target.Ar.value,
				Leírás: e.target.Leiras.value
			});

			toggleAddForm();
		} catch (error) {
			console.error(error);
		} finally {
			props.refresh();
		}
	};

	return (
		<div className="MealList">
			<div className="SearchBar">
				<div className="MLoptions">
					<input type="text" placeholder="keresés" className="Search" onChange={(e) => setQuery(e.target.value)} />
					<button className="add" onClick={toggleAddForm}>Add Food</button>
				</div>
			</div>
			<Offcanvas show={showAddForm} placement="end" onHide={toggleAddForm} style={{ backgroundColor: '#258037' }}>
				{' '}
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Étek hozzá adása</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col>
								<Form.Group controlId="Elnevezes">
									<Form.Label>Elnevezese:</Form.Label>
									<Form.Control type="text" name="Elnevezes" placeholder="Elnevezes" required />
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="Etelkategoria">
									<Form.Label>Etelkategoriája:</Form.Label>
									<Form.Select className="form-select" id="category" name="Etelkategoria" required>
										<option value="Leves">Leves</option>
										<option value="Főétel">Főétel</option>
										<option value="Hamburger">Hamburger</option>
										<option value="Pizza">Pizza</option>
										<option value="Desszert">Desszert</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="Ar">
									<Form.Label>Ar</Form.Label>
									<Form.Control type="number" name="Ar" placeholder="Ar" required />
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="Leiras">
									<Form.Label>Leírás</Form.Label>
									<Form.Control type="text" name="Leiras" placeholder="Leírás" required />
								</Form.Group>
							</Col>
						</Row>
						<button
							type="submit"
							style={{
								backgroundColor: 'lightgreen',
								borderRadius: '10px',
								width: '50%',
								margin: '24%',
								textAlign: 'center',
								padding: '20px',
								transition: 'background-color 0.3s ease' /* Add a transition effect */
							}}
							onMouseEnter={(e) => {
								e.target.style.backgroundColor = 'darkslategrey';
							}}
							onMouseLeave={(e) => {
								e.target.style.backgroundColor = 'lightgreen';
							}}
						>
							Hozzáad!
						</button>
					</Form>
				</Offcanvas.Body>
			</Offcanvas>
			{meals.map((item) => (
				<Meal food={item} destroy={props.deleteMeal} key={item.Etel_Azon} />
			))}
		</div>
	);
};

export default MealList;
