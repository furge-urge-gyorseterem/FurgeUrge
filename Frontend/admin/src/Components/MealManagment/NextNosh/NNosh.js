import './NNosh.css';
import React, { useState, useEffect } from 'react';

function NNosh() {
	const [inputValue, setInputValue] = useState('');
	const [dropdownValue, setDropdownValue] = useState('');
	const [numberValue, setNumberValue] = useState(0);

	return (
		<div className="NNosh">
			<div className="PicManegment">
				<div className="pic"></div>
			</div>
			<div className="dats">
				<div className="dat">
					<p>Elnevezes: </p>
					<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="nevezd el..." />
				</div>
				<div className="dat">
					<p>Kategória: </p>
					<select value={dropdownValue} onChange={(e) => setDropdownValue(e.target.value)}>
						<option value="">Válassz Kategóriát</option>
						<option value="option1">pizza</option>
						<option value="option2">Főétel</option>
						<option value="option3">Desszert</option>
					</select>
				</div>
				<div className="dat">
					<p>Ára (FT):</p>
					<input type="number" value={numberValue} onChange={(e) => setNumberValue(e.target.value)} min="0" />
				</div>
			</div>
			<div>
				<h1>Leirás</h1>
				<textarea rows="15" cols="150" placeholder="Ez egy nem méretezhető textarea."></textarea>
			</div>
		</div>
	);
}

export default NNosh;
