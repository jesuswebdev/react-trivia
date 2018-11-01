import React from "react";

const NextQuestion = props => {
  return (
    <div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-6-tablet is-6-desktop">
        <div className="box">
          <h1 className="title is-3 has-text-centered">¡Respuesta {props.wrong ? 'Incorrecta' : 'Correcta'}!</h1>
          {props.wrong && (
            <h1 className="subtitle is-5 has-text-centered">
              {props.children}
            </h1>
          )}
          <button
            type="button"
            className="button is-info is-large is-fullwidth"
            onClick={props.goToNextQuestion}>
            Siguiente Pregunta
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextQuestion;
