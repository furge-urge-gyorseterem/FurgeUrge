import axios from "axios";
import React, { useState, useEffect,useCallback } from "react";
import Meal from "../Meal/Meal";


function MealList(props) {
    const URL="http://localhost:8000/api/eteleink"
    const deleteURL="http://localhost:8000/api/eteleink/"

    const refresh = useCallback(() => {
      axios.get(URL)
        .then(ress => setMealsData(ress.data))
        .catch(err => console.error(err));
    }, [URL]);

    useEffect(() => {
      refresh(); // Itt hívjuk meg a refresh függvényt az adatok első lekéréséhez
    }, [refresh]);

    const [MealsData, setMealsData] = useState([]);
    useEffect(() => {
        axios.get(URL).then(ress=> setMealsData(ress.data))
        .catch(err => console.error(err=> console.error(err)))
    },[refresh]);
    console.log(MealsData)
    const destroy=(index)=>{
      axios.delete(deleteURL+index).then(ress=>{ console.log('siker'); refresh();})
      .catch(err => console.error(err=> console.error(err)))

    }

    
    
  

 
  return <div className="MealList">
    {MealsData.map(item=> props.kategoria=== "All"?  
    <Meal food={item} destroy={destroy}/>:

     props.kategoria === item.Etelkategoria ?
    <Meal food={item} destroy={destroy}/>:null ) }
   
  </div>;
}

export default MealList;
