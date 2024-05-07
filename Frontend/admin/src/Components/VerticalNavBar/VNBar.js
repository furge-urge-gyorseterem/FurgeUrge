import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from './navbar/icons/Logo.png';
import profpick from './navbar/prof/prof1.jpg';
import './VNBar.css';

function VNBAR({ name, userStatus }) {
	const links = {
		Admin: [
			{ to: "/", text: "Irányítópult" },
			{ to: "/meals", text: "Ételeink" },
			{ to: "/users", text: "Felhasználók" },
			{ to: "/orders", text: "Rendelések" }
		],
		Dolgozó: [
			{ to: "/", text: "Irányítópult" },
			{ to: "/meals", text: "Ételeink" },
			{to:"/Worker",text:"Rendelések"}
		],
		Futár: [
			{ to: "/", text: "Irányítópult" },
			{ to: "/orders", text: "Rendelések" }
		]
	};

	const userLinks = links[userStatus] || [{ to: "/", text: "Irányítópult" }]; // Default link if userStatus is undefined or not found

	return (
		<div className="VNBAR">
			<div className="ProfPic">
				<img className="Prof" src={profpick} alt="prof" />
			</div>
			<label>{name}</label>
			<div className="options">
				<ul>
					<li><a href="http://127.0.0.1:5500/Felhasznalo/F%C5%91oldal.html">Vissza a Főoldalra</a></li>
				</ul>
			</div>

			<ul>
				{userLinks.map(link => (
					<li key={link.to} className="arrow">
						<Link to={link.to} className="link">
							<div>{link.text}</div>
						</Link>
					</li>
				))}
			</ul>

			<img className="logo" src={LogoImage} alt="logo" />
		</div>
	);
}

export default VNBAR;
