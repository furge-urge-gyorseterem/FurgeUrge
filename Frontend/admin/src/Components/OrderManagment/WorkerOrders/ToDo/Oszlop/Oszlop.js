// Oszlop.js

import { DTYPE } from "../Constants/type";
import "./Oszlop.css";
import { useDrop } from "react-dnd";
import React, { useState } from "react";
import Cetli from "../Cetli/Cetli";

function Oszlop(props ) {


  const tabla=props.tabla
  // eslint-disable-next-line no-unused-vars
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DTYPE.Cetli,
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      console.log("ezt a rendelést :",item.Azon , item.Státusz, "megprobalt erre Módosítani:" + props.name);
      props.move( props.name,item.Azon);
   
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  console.log('a Tabla:')
  console.log(tabla)

  return (
    <div className="Oszlop" ref={drop}>
      <h1>{props.name}</h1>
      {props.tabla.map((elem, index) =>
        elem.RendelésStátusz === props.name ? (
          <Cetli
        
            elem={elem}
          />
        ) : null
      )}
      {props.children}
    </div>
  );
}

export default Oszlop;
