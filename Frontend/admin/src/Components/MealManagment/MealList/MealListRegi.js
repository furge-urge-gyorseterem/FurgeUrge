import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Meal from '../Meal/Meal';

function MealList(props) {
	const URL = 'http://localhost:8000/api/eteleink';
	const deleteURL = 'http://localhost:8000/api/eteleink/';

	const [MealsData, setMealsData] = useState([]);

	const refresh = useCallback(() => {
		axios
			.get(URL)
			.then((ress) => setMealsData(ress.data))
			.catch((err) => console.error(err));
	}, [URL]);

	useEffect(() => {
		refresh();
	}, [refresh]);

	useEffect(() => {
		axios
			.get(URL)
			.then((ress) => setMealsData(ress.data))
			.catch((err) => console.error((err) => console.error(err)));
	}, [refresh]);

	console.log(MealsData);

	const destroy = (index) => {
		axios
			.delete(deleteURL + index)
			.then((ress) => {
				console.log('siker');
				refresh();
			})
			.catch((err) => console.error((err) => console.error(err)));
	};

	const getFilteredMeals = (query, MealsData) => {
		if (!query) {
			return MealsData;
		}
		return MealsData.filter((foodname) => foodname.Elnevezes.toLowerCase().includes(query.toLowerCase()));
	};

	const [query, setQuery] = useState('');

	const filteredMeals = getFilteredMeals(query, MealsData);

	return (
		<div className="MealList">
			<div className="SearchBar">
				<input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="keresés" className="Search" />
			</div>
			{filteredMeals.map((item) =>
				props.kategoria === 'All' ? (
					<Meal food={item} destroy={destroy} />
				) : props.kategoria === item.Etelkategoria ? (
					<Meal food={item} destroy={destroy} />
				) : null
			)}
		</div>
	);
}

export default MealList;
