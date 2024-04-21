import CetliGenerator from '../CetliGenerator/CetliGenerator';
import Oszlop from '../Oszlop/Oszlop';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useEffect, useState } from 'react';
import './ToDo.css';
import SidePanel from '../Cettlipanel/sidepanel';
import { useMealApi } from '../../../../../api/MealApi';
import { Await } from 'react-router-dom';

function ToDo(props) {
	const [tablaOszlopai, settablaOszlopai] = useState([]);
	const [visible, setvisible] = useState(false);
	const { getrendop, statuszmodosit } = useMealApi();
	const [osszestecli, setosszestecli] = useState(props.Orders || []);

	const cetlihelyvaltoztatas = async (hova, azon) => {
		try {
			const response = await statuszmodosit(azon, hova);
			console.log('Státusz frissítve:', response.data);
			
		}
		finally{
			props.fech()
		}
	};
	
	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const response = await getrendop();

				const statusOrder = ['Készítése folyamatban', 'Kész', 'Futárra vár'];

				const filteredAndSortedData = response.data
					.map((o) => ({ name: o.RendelésStátusz, value: o.RendelésStátusz }))

					.filter((o) => statusOrder.includes(o.name))

					.sort((a, b) => {
						let indexA = statusOrder.indexOf(a.name);
						let indexB = statusOrder.indexOf(b.name);

						if (indexA === -1) indexA = statusOrder.length;
						if (indexB === -1) indexB = statusOrder.length;

						return indexA - indexB;
					});

				settablaOszlopai(filteredAndSortedData);
			} catch (error) {
				console.error('Hiba az opciók betöltésekor:', error);
			}
		};

		fetchOptions();
	}, []);

	useEffect(() => {
		if (props.Orders) {
			setosszestecli(props.Orders);
		}
	}, [props.Orders]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="Tabla">
				{tablaOszlopai.map((oszlop, index) => {
					return <Oszlop key={index} name={oszlop.name} index={index} tabla={osszestecli} move={cetlihelyvaltoztatas}></Oszlop>;
				})}
				{}
			</div>
		</DndProvider>
	);
};

export default ToDo;
