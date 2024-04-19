/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { DTYPE } from '../Constants/type';


import './Cetli.css';
import { useEffect, useState } from 'react';


const Cetli=(props)=> {
  
  const [C, setC] = useState(props.elem)
  console.log("C:")
  console.log(C)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DTYPE.Cetli,
    item: { Státusz: C.Státusz ,Azon: C.Rendeles_Azon},
    collect: monitor => ({
      // isDragging: !!monitor.isDragging(),
    }),
  }));
  useEffect(() => {
		if (props.elem) {
			setC(props.elem);
		}
	}, [props.elem]);


  return (
    <div className={DTYPE.Cetli} ref={drag}  > 
      <h2>{C.Rendeles_Azon}</h2>
      <ul className='content'>
        <li>alma</li>
        <li>körte</li>
        <li>barack</li>
      </ul>

    </div>
  );
}


export default Cetli;

