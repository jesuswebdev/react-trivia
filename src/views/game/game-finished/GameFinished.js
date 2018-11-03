import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import GameFinishedForm from "./game-finished-form/GameFinishedForm";

const GameFinished = props => {
  return (
    <div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-6-tablet is-6-desktop">
        <div className="box">
          {props.correctAnswers === props.totalQuestions ? (
            <Fragment>
              <h1 className="title is-2 has-text-centered">¡Enhorabuena!</h1>
              <h1 className="subtitle is-4 has-text-centered">
                Lograste Completar el Reto
              </h1>
              <h1 className="subtitle is-5 has-text-centered">
                Respondiste a todas las preguntas correctamente
              </h1>
            </Fragment>
          ) : (
            <Fragment>
              {props.timedOut ? (
                <h1 className="title is-4 has-text-centered">
                  ¡Se te acabó el tiempo!
                </h1>
              ) : (
                <h1 className="title is-4 has-text-centered">Fin del Juego</h1>
              )}
              {props.correctAnswers === 0 ? (
                <h1 className="subtitle is-5 has-text-centered">
                  No respondiste ninguna pregunta correctamente
                </h1>
              ) : (
                <h1 className="subtitle is-5 has-text-centered">
                  Respondiste correctamente {props.correctAnswers} preguntas de{" "}
                  {props.totalQuestions}
                </h1>
              )}
            </Fragment>
          )}

          {props.error && (
            <div class="notification is-danger">{props.errorMessage}</div>
          )}

          {!props.gameSaved && (
            <GameFinishedForm
              submitHandler={props.submitHandler}
              loading={props.loading}
            />
          )}
          {props.gameSaved && (
            <Fragment>
              <div className="notification is-success has-text-centered">
                El juego se guardó con éxito
              </div>
              <Link
                to="/nuevo"
                className="button is-info is-large is-fullwidth is-rounded"
                style={{ marginBottom: "15px", marginTop: "50px" }}>
                Jugar otra vez
              </Link>
              <Link
                to="/"
                className="button is-info is-large is-fullwidth is-rounded">
                Ir al menú principal
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameFinished;
