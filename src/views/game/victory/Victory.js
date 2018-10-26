import React from "react";
import { Link } from "react-router-dom";

const Victory = props => {
  return (
    <div>
      ¡Enhorabuena. Lograste completar el reto!
      <Link to="/nuevo" className="button">
        Jugar otra vez
      </Link>
      <Link to="/" className="button">
        Ir al menú principal
      </Link>
    </div>
  );
};

export default Victory;
