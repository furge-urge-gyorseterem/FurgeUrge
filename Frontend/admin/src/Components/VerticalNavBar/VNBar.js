import './VNBar.css';
import { Link } from 'react-router-dom';

function VNBAR() {
	return (
		<div className="VNBAR">
			<ul>
				<li>
					<Link to="/" className="link">
						Dashboard
					</Link>
				</li>
				<li>
					<Link to="/meals" className="link">
						Ételeink
					</Link>
				</li>
				<li>
					<Link to="/users" className="link">
						Felhasználók
					</Link>
				</li>
				<li>
					<Link to="/orders" className="link">
						Rendelések
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default VNBAR;
