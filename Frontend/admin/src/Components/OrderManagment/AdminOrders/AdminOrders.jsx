import { useState, useEffect } from 'react';

import AOrder from './AOrder/AOrder';

const AdminOrders = (props) => {



	return (
        <div className="AdminOrders">
        {props.Orders && props.Orders.map((item,index) => (
        
          <AOrder rendeles={item} key={index} state={props.state}></AOrder>
        ))}
      </div>
	);
};

export default AdminOrders;
