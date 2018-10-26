import React from "react";
import Timer from "../../../components/timer/Timer";

const ShowQuestion = props => {
  return (
    <div>
      <Timer />
      pregunta {props.currentQuestion} de {props.questionCount}
      <br />
      categoria: {props.question.category.title}
      <br />
      title: {props.question.title}
      <br />
      {props.question.options.map(q => {
        return (
          <button
            type="button"
            className="button"
            key={q.option_id}
            id={q.option_id}
            onClick={event => props.selectOptionHandler(event)}>
            {q.text}
          </button>
        );
      })}
    </div>
  );
};

export default ShowQuestion;
