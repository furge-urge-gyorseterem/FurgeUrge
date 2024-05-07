import { useEffect, useState } from 'react';
import { Button, Offcanvas, Toast } from 'react-bootstrap';
import './Meal.css';
import { useMealApi } from '../../../api/MealApi';

function Meal(props) {
	const [show, setShow] = useState(false);
	const [Name, setName] = useState(props.food.Elnevezes);
	const [Cost, setCost] = useState(props.food.Ar);
	const [Category, setCategory] = useState(props.food.Etelategoria);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { valtoztat } = useMealApi();

	const updatedMeal = {
		Elnevezes: Name,
		Ar: Cost,
		Etelategoria: Category
	};

	const edit = () => setShow(true);
	const destroy = async () => {
		try {
			setLoading(true);
			await props.destroy(props.food.Etel_Azon);
		
		} catch (err) {
			setError('Failed to delete meal.');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setLoading(true);
			const adat = { Elnevezes: Name, Ar: Cost, Etelategoria: Category };
			await valtoztat(props.food.Etel_Azon, adat);
		
			setShow(false);
		} catch (err) {
			setError('Failed to update meal.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setName(props.food.Elnevezes);
		setCost(props.food.Ar);
		setCategory(props.food.Etelategoria);
	}, [props.food]);

	return (
		<div className="Meal">
			<div className="MData">
				<div className="FoodName ColorBox">{Name}</div>
				<div className="Cost ColorBox">{Cost} FT</div>
			</div>
			<div className="Options">
				<div className="edit" onClick={edit}>✏️</div>
				<div className="delete" onClick={destroy}>❌</div>
			</div>
			{error && <Toast>{error}</Toast>}
			<Offcanvas show={show} onHide={() => setShow(false)} style={{ backgroundColor: '#258037' }}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Edit Meal</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{loading ? (
						<p>Loading...</p>
					) : (
						<form>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Étel neve:
								</label>
								<input type="text" className="form-control" id="name" value={Name} onChange={(e) => setName(e.target.value)} />
							</div>
							<div className="mb-3">
								<label htmlFor="cost" className="form-label">
									Ára:
								</label>
								<input type="number" className="form-control" id="cost" value={Cost} onChange={(e) => setCost(e.target.value)} />
							</div>
							<div className="mb-3">
								<label htmlFor="category" className="form-label">
									Kategoriája:
								</label>
								<select className="form-select" id="category" value={Category} onChange={(e) => setCategory(e.target.value)}>
									<option value="Leves">Leves</option>
									<option value="Főétel">Főétel</option>
									<option value="Hamburger">Hamburger</option>
									<option value="Pizza">Pizza</option>
									<option value="Desszert">Desszert</option>
								</select>
							</div>
							<Button
								variant="success"
								onClick={handleSubmit}
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
						</form>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default Meal;
