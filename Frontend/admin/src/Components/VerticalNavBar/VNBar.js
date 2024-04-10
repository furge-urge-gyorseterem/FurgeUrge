/* eslint-disable jsx-a11y/anchor-is-valid */
import './VNBar.css';
import { Link } from 'react-router-dom';
import LogoImage from './navbar/icons/Logo.png';
import profpick from './navbar/prof/prof1.jpg';

function VNBAR(props) {
	return (
		<div className="VNBAR">
			<div className="ProfPic">
				<img className="Prof" src={profpick} alt="prof"></img>
			</div>
			<label>{props.name}</label>
			<div className="options">
				<ul>
					<li>
						{' '}
						<a href="http://127.0.0.1:5500/Felhasznalo/F%C5%91oldal.html">Visza a Főoldalra</a>
					</li>
					<li>
						{' '}
						<a href="#"> Beállítások</a>
					</li>
					<li>
						{' '}
						<a href="#"> Kijelentkezés</a>
					</li>
				</ul>
			</div>

			<ul>
				<li className="arrow">
					<Link to="/" className="link">
						<div>Dashboard</div>
					</Link>
				</li>
				<li className="arrow">
					<Link to="/meals" className="link">
						<div>Ételeink</div>
					</Link>
				</li>
				<li className="arrow">
					<Link to="/users" className="link">
						<div>Felhasználók</div>
					</Link>
				</li>
				<li className="arrow">
					<Link to="/orders" className="link">
						<div>Rendelések</div>
					</Link>
				</li>
			</ul>

			<img className="logo" src={LogoImage} alt="logo"></img>
		</div>
	);
}

export default VNBAR;
