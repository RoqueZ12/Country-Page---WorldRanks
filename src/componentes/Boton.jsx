import React from "react";
import '../sass/Boton.scss';

const Boton = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
}

export { Boton };
