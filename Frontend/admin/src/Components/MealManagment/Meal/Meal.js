import "./Meal.css";

function Meal(props) {
    console.log(props.food)
    const destroy=()=>{
        props.destroy(props.food.id)
    }

  return (
    <div className="Meal">
      <div className="Data">
        <div className="FoodName">{props.food.Elnevezes}</div>

        <div className="Cost">{props.food.Ar} FT</div>
      </div>
      <div className="Options">
        <div className="edit">✏</div>
        <div className="delete" onClick={destroy}>🗑️</div>
      </div>
    </div>
  );
}

export default Meal;
