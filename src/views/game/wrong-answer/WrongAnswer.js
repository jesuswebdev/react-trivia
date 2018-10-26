import React from "react";
import { Link } from "react-router-dom";

const WrongAnswer = props => {
  return (
    <div>
      ¡Respuesta Incorrecta!
      <Link to="/nuevo" className="button">
        Jugar otra vez
      </Link>
      <Link to="/" className="button">
        Ir al menú principal
      </Link>
    </div>
  );
};

export default WrongAnswer;
