/* eslint-disable no-unused-vars */
import { useDrag } from 'react-dnd';
import { DTYPE } from '../Constants/type';


import './Cetli.css';
import { useEffect, useState } from 'react';


const Cetli=(props)=> {
  
  const [C, setC] = useState(props.elem)
  const [RendeltTetelek,setRendTetelek]=useState([]);
  console.log("C:")
  console.log(C)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DTYPE.Cetli,
    item: { Státusz: C.Státusz ,Azon: C.Rendeles_Azon},
    collect: monitor => ({

    }),
  }));
  useEffect(() => {
		if (props.elem) {
			setC(props.elem);
		}
	}, [props.elem]);
  useEffect(() => {
    if (props.elem && props.elem.RendeltTetelek) {
        try {
            const formattedString = `[${props.elem.RendeltTetelek}]`;
          
            const parsedTetelek = JSON.parse(formattedString);
            setRendTetelek(parsedTetelek);
        } catch (error) {
      
            setRendTetelek([]);
        }
    }
}, [props.elem]);

  console.log('RendeltTetelek->')
  console.log(RendeltTetelek)

  return (
    <div className={DTYPE.Cetli} ref={drag}  > 
      <h2>{C.Rendeles_Azon}</h2>
      <div className="OrderData card mb-3">
								<div className="card-header">Rendelés Tételei</div>
								<div className="card-body">
									<ul className="list-group">
										{RendeltTetelek.map((elem) => (
											<li className="list-group-item" key={elem.id}>
												{elem.mennyiseg} DB {elem.Elnevezes} 
											</li>
										))}
									</ul>
								</div>
							</div>

    </div>
  );
}


export default Cetli;

