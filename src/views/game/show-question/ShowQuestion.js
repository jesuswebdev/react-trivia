import React from "react";
import Timer from "../../../components/timer/Timer";

const ShowQuestion = props => {
  return (
    <div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-10-tablet is-10-desktop">
        <div>
          {/* <h1 className="subtitle is-4 has-text-centered">
            Pregunta {props.currentQuestion}/{props.questionCount} - Categoría:{" "}
            {props.question.category.title}
          </h1> */}
          <h1 className="subtitle is-2 has-text-centered">
            Tiempo Restante: <Timer />
          </h1>
          <div className="box">
            <h1 className="subtitle is-4 has-text-centered">
              {props.question.title}
            </h1>
          </div>

          <div className="columns is-multiline">
            {props.question.options.map(q => {
              return (
                <div className="column is-6">
                  <button
                    type="button"
                    className="button is-fullwidth is-large is-rounded is-info"
                    key={q.option_id}
                    id={q.option_id}
                    onClick={event => props.selectOptionHandler(event)}>
                    {q.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowQuestion;
