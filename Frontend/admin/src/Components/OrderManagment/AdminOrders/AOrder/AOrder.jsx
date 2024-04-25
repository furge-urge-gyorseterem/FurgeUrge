/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { useMealApi } from '../../../../api/MealApi';
import './AOrder.css';
import { Button, Offcanvas } from 'react-bootstrap';

function AOrder(props) {
	const [selectedOption, setSelectedOption] = useState('');
	const [options, setOptions] = useState([]);
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const [RendeltTetelek,setRendTetelek]=useState([]);

	const { getrendop, statuszmodosit, getAdminSzAdat } = useMealApi();

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
		setRendTetelek(props.rendeles.RendeltTetelek);
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

	const handleSelectFuttarButtonClickKI = async () => {
		try {
			const response = await statuszmodosit(props.rendeles.Rendeles_Azon, 'Kiszállítva');
			console.log('Státusz frissítve:', response.data);
			props.fetch();
		} catch (error) {
			console.error('Hiba a státusz frissítésekor:', error);
		}
	};
	const handleSelectFuttarButtonClickFel = async () => {
		try {
			const response = await statuszmodosit(props.rendeles.Rendeles_Azon, 'Futárnál');
			console.log('Státusz frissítve:', response.data);
			props.fetch();
		} catch (error) {
			console.error('Hiba a státusz frissítésekor:', error);
		}
	};

	const handleWatchClick = () => {
		setShowOffcanvas(!showOffcanvas);
	};


	useEffect(() => {

		if (props.rendeles && props.rendeles.RendeltTetelek) {
			try {
			
				const parsedTetelek = JSON.parse(`[${props.rendeles.RendeltTetelek}]`);
				setRendTetelek(parsedTetelek);
			} catch (error) {
				console.error('Hiba a rendelt tételek parse-olásakor:', error);
				setRendTetelek([]);
			}
		}
	}, [props.rendeles]);

	if (props.state === 'Admin') {
		return (
			<div className="AOrder">
				<div className="Container">
					<div className="RData">
						<div className="azonosító">Rendelés Azonosítója: {props.rendeles.Rendeles_Azon}</div>
						<div className="Megrendelo">Megrendelő: {props.rendeles.MegrendelőNév}</div>
						<div className="Futár">Név: {props.rendeles.FutárNév}</div>
					</div>

					<div className="ROptions">
						<div className="watch" onClick={handleWatchClick}>
							👁
						</div>

						<select className="stat" value={selectedOption} onChange={handleSelectChange}>
							<option value="">{props.rendeles.Státusz || 'Válassz státuszt'}</option>
							{options.map((option, index) => (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<Offcanvas show={showOffcanvas} placement="end" onHide={handleWatchClick} style={{ backgroundColor: '#4caf50' }}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Rendelés adatai</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div className="OrderDetails">
							<div className="OrderData card mb-3">
								<div className="card-header">Rendelés Adatai</div>
								<div className="card-body">
									<h5 className="card-title">Rendelés Azonosítója: {props.rendeles.Rendeles_Azon}</h5>
									<p className="card-text">
										Megrendelő: {props.rendeles.MegrendelőNév} <br />
										Azonosító: {props.rendeles.MegrendelőID}
									</p>
									<p className="card-text">
										Futár Név: {props.rendeles.FutárNév} <br />
										Futár ID: {props.rendeles.FutárID}
									</p>
								</div>
							</div>
							<div className="OrderData card mb-3">
								<div className="card-header">Rendelés Tételei</div>
								<div className="card-body">
									<ul className="list-group">
										{RendeltTetelek.map((elem) => (
											<li className="list-group-item" key={elem.id}>
												{elem.mennyiseg} DB {elem.Elnevezes} 
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="OrderData card mb-3">
								<div className="card-header" style={{ textAlign: 'center' }}>
										{props.rendeles.Vegosszeg} FT
								</div>
							</div>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			</div>
		);
	} else if (props.state === 'Futár') {
		if (props.rendeles.Státusz == 'Futárra vár' || props.rendeles.Státusz == 'Futárnál') {
			return (
				<div className="AOrder">
					<div className="Container">
						<div className="RData">
							<div className="azonosító">Rendelés Azonosítója: {props.rendeles.Rendeles_Azon}</div>
							<div className="Megrendelo">Megrendelő: {props.rendeles.MegrendelőNév}</div>
							<div className="Futár">Név: {props.rendeles.FutárNév}</div>
						</div>

						{props.rendeles.Státusz === 'Futárra vár' ? (
							<button onClick={handleSelectFuttarButtonClickFel}>Felvétel</button>
						) : (
							<button onClick={handleSelectFuttarButtonClickKI}>Kiszállítva!</button>
						)}
					</div>
				</div>
			);
		} else if (props.rendeles.Státusz != 'Kiszállítva') {
			return (
				<div className="Warning">
					<h4>{props.rendeles.Státusz} Kérlek várj türelmesen , ez a rendelés még készül!</h4>
				</div>
			);
		}
	}
}

export default AOrder;
