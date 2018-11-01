import React from 'react';
import { Link } from 'react-router-dom';

const SuccessScreen = ({reset}) => {
	return (
		<div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-6-tablet is-6-desktop">
        <div className="box">
          <h1 className="title is-3 has-text-centered">¡Gracias por tu contribución!</h1>
      		<h1 className="subtitle is-5 has-text-centered">
            Ahora tu pregunta será evaluada por el administrador
          </h1>
          
          <button
          	style={{marginBottom: '12px'}}
            className="button is-info is-large is-fullwidth"
            onClick={reset}>
            Proponer otra pregunta
          </button>
          <Link
          	to="/"
            className="button is-info is-large is-fullwidth"
            onClick={reset}>
            Ir al menú principal
          </Link>
        </div>
      </div>
    </div>
   )
};

export default SuccessScreen;