/* eslint-disable react-hooks/exhaustive-deps */
import './DMTool.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState, useEffect } from 'react';
import { useMealApi } from '../../../api/MealApi';

import MealList from '../MealList/MealList';

function DMTool() {
	const [allMeal, setAllMeal] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [tabIndex, setTabIndex] = useState(0);
	const [refresh, setrefresh] = useState(0);

	const { getMeals, deleteMeal } = useMealApi();

	const fetchMeals = async () => {
        try {
            const { data } = await getMeals();
            const filteredMeals = data.filter((meal) => meal.Etelkategoria !== 'Törölt');
            setAllMeal(filteredMeals);
            const categoriesList = ['Összes', ...new Set(filteredMeals.map((category) => category.Etelkategoria))];
            setCategories(categoriesList);
        } catch (error) {
            console.log(error);
        }
    };
	

	const removeMeal = async (id) => {
		try {
			await deleteMeal(id);
			fetchMeals();
		} catch (error) {
			console.error(error);
		}
	};

	const selectCategory = (index) => {
		setTabIndex(index);
		setSelectedCategory(categories[index]);
	};

	useEffect(() => {
		if (!categories.includes(selectedCategory)) {
			selectCategory(0);
		}
	}, [categories]);

	useEffect(() => {
		fetchMeals();
	}, [refresh]);

	const getMealList = (currentCategory) => {
		if (currentCategory === 'Összes') return allMeal;
		return allMeal.filter((meal) => meal.Etelkategoria === currentCategory);
	};
	const refresher=()=>{
		setrefresh(refresh+1)
	}

	return (
		<div className="DMTool">
			<Tabs className="" selectedIndex={tabIndex} onSelect={(index) => selectCategory(index)}>
				<TabList className="costumTablist">
					{categories.map((category) => (
						<Tab className="costumTab">{category}</Tab>
					))}
				</TabList>

				{categories.map((category) => (
					<TabPanel>
						<MealList meals={getMealList(category)} deleteMeal={removeMeal} refresh={refresher}/>
				
					</TabPanel>

					
				))}
			</Tabs>
		</div>
	);
}

export default DMTool;
