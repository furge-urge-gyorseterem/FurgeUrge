import { useState, useEffect } from 'react';
import Meal from '../Meal/Meal';

const MealList = (props) => {

	const [meals, setMeals] = useState([]);
	const [query, setQuery] = useState('');

	const getFilteredMeals =  () => {
		if (!query) {
			return props.meals;
		}
		return  props.meals.filter((foodname) => foodname.Elnevezes.toLowerCase().includes(query.toLowerCase()));
	};

	useEffect(() => {
		setMeals(getFilteredMeals())
	}, [query,props.meals])

	return (
		<div className="MealList">
			<div className="SearchBar">
				<input type="text" placeholder="keresés" className="Search" onChange={(e) => setQuery(e.target.value)} />
			</div>
			{meals.map((item) => (
				<Meal food={item} destroy={props.deleteMeal}/>
			))}
		</div>
	);
};

export default MealList;
