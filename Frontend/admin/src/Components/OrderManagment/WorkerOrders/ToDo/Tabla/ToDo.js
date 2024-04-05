import CetliGenerator from '../CetliGenerator/CetliGenerator';
import Oszlop from '../Oszlop/Oszlop';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useEffect, useState } from 'react';
import './ToDo.css';
import SidePanel from '../Cettlipanel/sidepanel';
import { useMealApi } from '../../../../../api/MealApi';

function ToDo(props) {
	const [tablaOszlopai, settablaOszlopai] = useState([]);
	const [visible, setvisible] = useState(false);
	//const [sideDate, setsideDate] = useState({ name: 'név', leiras: 'ez itt egy feladat leiras' });

	const [osszestecli, setosszestecli] = useState(props.Orders);

	const cetlihelyvaltoztatas = (ujazon, elemszam) => {
		setosszestecli((currentCetlik) => {
			const ujCetlik = currentCetlik.map((cetli, index) =>
				index === elemszam
					? {
							...cetli,
							azon: ujazon,
							folyamatban: ujazon + 1 !== tablaOszlopai.length
					  }
					: cetli
			);
			return ujCetlik;
		});
	};

	const hozzad = (cetlidata) => {
		const ujOsszesCetli = [...osszestecli, { ...cetlidata, elemszam: osszestecli.length, folyamatban: true }];
		setosszestecli(ujOsszesCetli);
	};

	const kesz = (elemszam, msg) => {
		console.log(elemszam);
		alert(osszestecli[elemszam].name + msg);
		setosszestecli(osszestecli.filter((item) => item.elemszam !== elemszam));
	};
	const show = (enter) => {
		setvisible(enter);
	};
	const sideDateset = (date) => {
		console.log(date);
	//	setsideDate({ name: date.name, leiras: date.leiras });
	};
	//Dolgozósitás

	const { getrendop, statuszmodosit } = useMealApi();

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const response = await getrendop();
				const filteredAndSortedData = response.data
					.map((o) => ({ name: o.RendelésStátusz, value: o.RendelésStátusz }))
					.filter((o) => o.name !== 'Kiszállítva')
					.sort((a, b) => b.name.length - a.name.length); // Sort from longest to shortest name
				settablaOszlopai(filteredAndSortedData);
			} catch (error) {
				console.error('Hiba az opciók betöltésekor:', error);
			}
		};

		fetchOptions();
	}, []);
	console.log('a cetlik:');
	console.log(osszestecli);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="Tabla">
				{tablaOszlopai.map((oszlop, index) => {
					return (
						<Oszlop
							key={index}
							name={oszlop.name}
							index={index}
							tabla={osszestecli}
							move={cetlihelyvaltoztatas}
							kesz={kesz}
							show={show}
							sideDateset={sideDateset}
						></Oszlop>
					);
				})}
				{
					//visible && <SidePanel name={sideDate.name + ':'} leiras={sideDate.leiras} />}
				}
			</div>
		</DndProvider>
	);
}

export default ToDo;
