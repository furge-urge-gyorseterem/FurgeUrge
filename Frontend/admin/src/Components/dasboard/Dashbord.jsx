import './Dashbord.css';
const Dashboard = (props) => {
	return (
		<div className="Db">
			{props.realRank === 'Admin' ? (
				<div className="admin-section">
					<h1>Szerep választó</h1>
					<button onClick={() => props.set('Admin')}>Admin</button>
					<button onClick={() => props.set('Dolgozó')}>Dolgozó</button>
					<button onClick={() => props.set('Futár')}>Futár</button>
				</div>
			) : null}
			<div className="KK">
				<div>
					<h2>Kézi könyv</h2>
				</div>
				<div>
					<h3 className="üdvözlő">Üdvözöljük a kézi könyvben!</h3>
					<p>
						Nagy örömmel üdvözlök minden fürge ürgét az alábbi kis olvasmányban. Itt megtaláltok minden információt a munkavégzéshez, és ne
						feledjétek: nélkületek nincs Fürge ürge.
					</p>
				</div>
				<div>
					<h3 className="Dolgozó">Dolgozó szekció információ</h3>
					<p className="DU">
						Kedves Futár, ha esetleg elakadnál munka végzésed során, ez a szekció neked szól. Ha a rendelések fülre kattintasz, láthatod, mely
						rendeléseket kell felvenni vagy épp kivinned! Ezt könnyedén megteheted a "felveszem" vagy "kiszállítottam" gombokkal. Ne csüggedj, ha
						nem látod a kiszállítás gombot, az csak akkor bukkan fel, ha fel is vetted.
					</p>
				</div>

				<div>
					<h3 className="Futar">Futár szekció információ</h3>
					<p className="FU">
						Kedves Futár, ha esetleg elakadnál munka végzésed során, ez a szekció neked szól. Ha a rendelések fülre kattintasz, láthatod, mely
						rendeléseket kell felvenni vagy épp kivinned! Ezt könnyedén megteheted a "felveszem" vagy "kiszállítottam" gombokkal. Ne csüggedj, ha
						nem látod a kiszállítás gombot, az csak akkor bukkan fel, ha fel is vetted.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
