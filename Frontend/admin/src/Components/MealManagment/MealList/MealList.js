import axios from "axios";
import React, { useState, useEffect } from "react";
import Meal from "../Meal/Meal";


function MealList(props) {
    const URL="http://localhost:8000/api/eteleink"

    const [MealsData, setMealsData] = useState([]);
    useEffect(() => {
        axios.get(URL).then(ress=> setMealsData(ress.data))
        .catch(err => console.error(err=> console.error(err)))
    },[]);

    
    
  

 
  return <div className="MealList">
    {MealsData.map(item=> props.kategoria=== "all"?  
    <Meal fname={item.Elnevezes} cost={item.Ar}/>:

     props.kategoria=== item.Etelkategoria ?
    <Meal fname={item.Elnevezes} cost={item.Ar}/>:null ) }
   
  </div>;
}

export default MealList;
