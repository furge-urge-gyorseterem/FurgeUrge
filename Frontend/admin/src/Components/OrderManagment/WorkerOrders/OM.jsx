import { useState, useEffect } from 'react';
import ToDo from './ToDo/Tabla/ToDo'


const WorkOrders = (props) => {
	return <div className="WorkOrders">
        <ToDo Orders={props.Orders}></ToDo>
    </div>;
};

export default WorkOrders;
