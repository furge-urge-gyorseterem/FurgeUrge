// AOrder.js
import React, { useState, useEffect } from 'react';
import { useMealApi } from '../../../../api/MealApi';
import './AOrder.css';

function AOrder(props) {
	const [selectedOption, setSelectedOption] = useState('');
	const [options, setOptions] = useState([]);

	const { getrendop, statuszmodosit } = useMealApi();

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const response = await getrendop();
				setOptions(response.data.map((o) => ({ label: o.RendelésStátusz, value: o.RendelésStátusz })));
			} catch (error) {
				console.error('Hiba az opciók betöltésekor:', error);
			}
		};

		fetchOptions();
	}, []);

	const handleSelectChange = async (event) => {
		setSelectedOption(event.target.value);
		try {
			const response = await statuszmodosit(props.rendeles.Rendeles_Azon, event.target.value);
			console.log('Státusz frissítve:', response.data);
		} catch (error) {
			console.error('Hiba a státusz frissítésekor:', error);
		}
	};

	return (
		<div className="AOrder">
			<div className="RData">
				<div className="azonosító">Rendelés Azonosítója: {props.rendeles.Rendeles_Azon}</div>
				<div className="Megrendelo">
					Megrendelő: {props.rendeles.MegrendelőNév} <br /> Azon: {props.rendeles.MegrendelőID}
				</div>
				<div className="Futár">
					Név: {props.rendeles.FutárNév} <br /> Azon: {props.rendeles.FutárID}
				</div>
			</div>
			<div className="ROptions">
				<select className="stat" value={selectedOption} onChange={handleSelectChange}>
					<option value="">{props.rendeles.Státusz || 'Válassz státuszt'}</option>
					{options.map((option, index) => (
						<option key={index} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{/* További interaktív elemek helye */}
			</div>
		</div>
	);
}

export default AOrder;
