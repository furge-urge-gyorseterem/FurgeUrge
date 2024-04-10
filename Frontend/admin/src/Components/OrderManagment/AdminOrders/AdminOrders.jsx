import { useState, useEffect } from 'react';

import AOrder from './AOrder/AOrder';

const AdminOrders = (props) => {



	return (
        <div className="AdminOrders">
        {props.Orders && props.Orders.map((item,index) => (
        
          <AOrder rendeles={item} key={index}></AOrder>
        ))}
      </div>
	);
};

export default AdminOrders;
