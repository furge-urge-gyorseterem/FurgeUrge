import './VNBar.css';

function VNBAR() {
	return <div className="VNBAR">
	<div className='ProfPic'>
	 
	</div>
	<label>Felhasználó név</label>
	<div className="options">
		<ul>
			<li> <a href="#"><img src='navbar/icons/logout.jpg' alt=''/> Visza a Főoldalra</a></li>
			<li> <a href="#"> Beállítások</a></li>
			<li> <a href="#"> Kijelentkezés</a></li>
			
		</ul>

	</div>
	</div>;

}

export default VNBAR;
