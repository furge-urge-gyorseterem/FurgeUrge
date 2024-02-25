import "./Meal.css";

function Meal(props) {
  return (
    <div className="Meal">
      <div className="Data">
        <div className="FoodName">{props.fname}</div>

        <div className="Cost">{props.cost} FT</div>
      </div>
      <div className="Options">
        <div className="edit">✏</div>
        <div className="delete">🗑️</div>
      </div>
    </div>
  );
}

export default Meal;
