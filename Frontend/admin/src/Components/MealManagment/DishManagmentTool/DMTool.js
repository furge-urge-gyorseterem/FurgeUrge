
import './DMTool.css';
import MealList from './Components/MealManagment/MealList/MealList';

function DMTool() {
const DMToolKategoris =["All","Leves","Főétel","Desszert"]









  return (
    <div className="DMTool">
    {DMToolKategoris.map(item=>(<Tab>{item}</Tab>))}
   
  
    </div>
  );
}

export default DMTool;
