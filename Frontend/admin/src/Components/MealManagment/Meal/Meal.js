import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import './Meal.css';

function Meal(props) {
	const [show, setShow] = useState(false);
	const [Name, setName] = useState(props.food.Elnevezes);
	const [Cost, setCost] = useState(props.food.Ar);
	const [Category, setCategory] = useState(props.food.Ar);

	const edit = () => {
		setShow(true);
	};

	const destroy = () => {
		props.destroy(props.food.Etel_Azon);
	
	
	};
	const hendelSubmit=()=>{
		const adat={Elnevezes:{Name},Ar:{Cost},Etelategoria:{Category} }

	}

	return (
		<div className="Meal">
			<div className="MData">
				<div className="FoodName ColorBox">{props.food.Elnevezes}</div>

				<div className="Cost ColorBox">{props.food.Ar} FT</div>
			</div>
			<div className="Options">
				<div className="edit" onClick={edit}>
					✏
				</div>
				<div className="delete" onClick={destroy}>
					🗑️
				</div>
			</div>
			<Offcanvas show={show} onHide={() => setShow(false)} style={{ backgroundColor: '#258037' }}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Edit Meal</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<form onSubmit={hendelSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Étel neve:
							</label>
							<input type="text" className="form-control" id="name" value={Name} onChange={(event) => setName(event.target.value)} />
						</div>
						<div className="mb-3">
							<label htmlFor="cost" className="form-label">
								Ára
							</label>
							<input type="number" className="form-control" id="cost" value={Cost} onChange={(event) => setCost(event.target.value)} />
						</div>
						<div className="mb-3">
							<label htmlFor="category" className="form-label">
								Kategoriája
							</label>
							<select className="form-select" id="category" value={Category} onChange={(event) => setCategory(event.target.value)}>
								<option value="Leves">Leves</option>
								<option value="Főétel">Főétel</option>
								<option value="Hamburger">Hamburger</option>
								<option value="Pizza">Pizza</option>
								<option value="Desszert">Desszert</option>
							</select>
						</div>
						<button type="submit" className="btn btn-primary">
							Save Changes
						</button>
					</form>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default Meal;
