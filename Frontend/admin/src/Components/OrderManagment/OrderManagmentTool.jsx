import React, { useState } from 'react';
import './OrderManagmentTool.css';

const OrderManagmentTool = () => {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = () => setIsChecked(!isChecked);

	return (
		<div>
			<label className="switch">
				<input type="checkbox" checked={isChecked} onChange={handleChange} />
				<span className="slider"></span>
			</label>
            <label >
			{isChecked ? 'Admin vagyok muhaha' : 'Work hard sleep well'}
            </label>
		</div>
	);
};



export default OrderManagmentTool;
