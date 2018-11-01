import React from "react";

const StartQuestion = props => {
  return (
    <div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-6-tablet is-6-desktop">
        <div className="box">
          <h3 className="title is-3 has-text-centered">
            Pregunta {props.currentQuestion} de {props.questionCount}
          </h3>
          <h1 className="subtitle is-5 has-text-centered">Categoria: {props.category}</h1>
          <button
            type="button"
            className="button is-info is-large is-fullwidth"
            onClick={props.startQuestion}>
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartQuestion;
