import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Columns, Column, Box, Typography } from '../../../components/UI';
import GameFinishedForm from "./game-finished-form/GameFinishedForm";

const GameFinished = props => {
  return (
    <Columns mobile tablet desktop centered>
      <Column mobile={10} tablet={6} desktop={6}>
        <Box>
          {props.correctAnswers === props.totalQuestions ? (
            <Fragment>
              <Typography type="title" size={2} centered>
                ¡Enhorabuena!
              </Typography>
              <Typography type="subtitle" size={4} centered>
                Lograste Completar el Reto
              </Typography>
              <Typography type="subtitle" size={5} centered>
                Respondiste a todas las preguntas correctamente
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {props.timedOut ? (
                <Typography type="title" size={4} centered>
                  ¡Se te acabó el tiempo!
                </Typography>
              ) : (
                <Typography type="title" size={4} centered>Fin del Juego</Typography>
              )}
              {props.correctAnswers === 0 ? (
                <Typography type="subtitle" size={5} centered>
                  No respondiste ninguna pregunta correctamente
                </Typography>
              ) : (
                <Typography type="subtitle" size={5} centered>
                  Respondiste correctamente {props.correctAnswers} preguntas de{" "}
                  {props.totalQuestions}
                </Typography>
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
        </Box>
      </Column>
    </Columns>
  );
};

export default GameFinished;
