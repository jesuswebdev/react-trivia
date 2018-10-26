import React from "react";

const StartQuestion = props => {
  return (
    <div>
      Pregunta {props.currentQuestion} de {props.questionCount}
      <br />
      categoria: {props.category}
      <br />
      <button
        type="button"
        className="button is-info"
        onClick={props.startQuestion}>
        Comenzar
      </button>
    </div>
  );
};

export default StartQuestion;
