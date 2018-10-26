import React from "react";
import { Link } from "react-router-dom";

const TimedOut = props => {
  return (
    <div>
      ¡Se te acabó el tiempo!
      <Link to="/nuevo" className="button">
        Jugar otra vez
      </Link>
      <Link to="/" className="button">
        Ir al menú principal
      </Link>
    </div>
  );
};

export default TimedOut;
