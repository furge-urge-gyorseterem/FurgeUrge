/* eslint-disable jsx-a11y/anchor-is-valid */
import './VNBar.css';
import { Link } from 'react-router-dom';

function VNBAR() {
	return (
		<div className="VNBAR">
			<div className="ProfPic"></div>
			<label>Felhasználó név</label>
			<div className="options">
				<ul>
					<li>
						{' '}
						<a href="#">
							<img src="navbar/icons/logout.jpg" alt="" /> Visza a Főoldalra
						</a>
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
		</div>
	);
}

export default VNBAR;
