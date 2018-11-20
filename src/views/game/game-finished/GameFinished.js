import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Alert } from "antd";
import GameFinishedForm from "./game-finished-form/GameFinishedForm";

const GameFinished = props => {
  const title = {
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "0"
  };
  const subtitle = {
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "24px"
  };
  return (
    <Row type="flex" justify="center">
      <Col xs={22} sm={16} md={16} lg={10}>
        <Card>
          {props.correctAnswers === props.totalQuestions ? (
            <Fragment>
              <h1 style={title}>¡Enhorabuena!</h1>
              <h1
                style={{
                  fontSize: "1.05rem",
                  textAlign: "center"
                }}>
                Lograste Completar el Reto
              </h1>
              <h1 style={subtitle}>
                Respondiste a todas las preguntas correctamente
              </h1>
            </Fragment>
          ) : (
            <Fragment>
              {props.timedOut ? (
                <h1 style={title}>¡Se te acabó el tiempo!</h1>
              ) : (
                <h1 style={title}>Fin del Juego</h1>
              )}
              {props.correctAnswers === 0 ? (
                <h1 style={subtitle}>
                  No respondiste ninguna pregunta correctamente
                </h1>
              ) : (
                <h1 style={subtitle}>
                  {`Preguntas correctas: ${props.correctAnswers} / ${
                    props.totalQuestions
                  }`}
                </h1>
              )}
            </Fragment>
          )}

          {props.error && (
            <Alert
              showIcon
              type="error"
              message="Error"
              description="Ocurrió un error al intentar guardar el juego"
            />
          )}

          {!props.gameSaved && (
            <GameFinishedForm
              submitHandler={props.submitHandler}
              loading={props.loading}
              username={props.username}
            />
          )}
          {props.gameSaved && (
            <Fragment>
              <Alert
                showIcon
                closable
                type="success"
                message="Guardado"
                description="El juego se guardó con éxito"
              />
              <Link to="/nuevo">
                <Button
                  type="primary"
                  block
                  style={{ marginBottom: "12px", marginTop: "24px" }}>
                  Jugar otra vez
                </Button>
              </Link>
              <Link to="/">
                <Button type="primary" block>
                  Ir al menú principal
                </Button>
              </Link>
            </Fragment>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default GameFinished;
