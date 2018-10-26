import React from "react";

const NextQuestion = props => {
  return (
    <div>
      ¡Respuesta Correcta!{" "}
      <button type="button" className="button" onClick={props.goToNextQuestion}>
        Siguiente pregunta
      </button>
    </div>
  );
};

export default NextQuestion;
