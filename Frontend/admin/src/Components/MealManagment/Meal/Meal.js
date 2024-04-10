import './Meal.css';

function Meal(props) {
	console.log(props.food);
	const destroy = () => {
		props.destroy(props.food.Etel_Azon);
	};

	return (
		<div className="Meal">
			<div className="MData">
				<div className="FoodName ColorBox">{props.food.Elnevezes}</div>

				<div className="Cost ColorBox">{props.food.Ar} FT</div>
			</div>
			<div className="Options">
				<div className="edit">✏</div>
				<div className="delete" onClick={destroy}>
					🗑️
				</div>
			</div>
		</div>
	);
}

export default Meal;
