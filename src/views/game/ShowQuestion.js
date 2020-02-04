import React from "react";
import Timer from "../../components/timer/Timer";
import QuestionOptions from "./question/Options";
import QuestionTitle from "./question/Title";
import { Row, Col, Button, Alert } from "antd";

const ShowQuestion = ({
  answered,
  timedOut,
  onTimedOut,
  nextQuestion,
  question,
  selectOptionHandler,
  selectedOption,
  validatingAnswer,
  remainingAttempts,
  response,
  error,
  retry,
  start,
  loading
}) => {
  const networkErrorAlert = (
    <Alert
      showIcon
      message="Error de red"
      type="error"
      description={
        <>
          <p>
            <span
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={retry}>
              Haz click aquí
            </span>{" "}
            para volver a intentar
          </p>
        </>
      }
    />
  );

  const alert = (
    <Alert
      showIcon
      message={
        answered
          ? `Respuesta ${(response || {}).result ? "" : "in"}correcta`
          : "Se te acabó el tiempo"
      }
      type={answered && (response || {}).result ? "success" : "error"}
      description={
        <>
          {answered && !(response || {}).result && (
            <p>{`La respuesta correcta era: ${
              (
                question.options.find(
                  opt => opt.option_id === (response || {}).correct_option_id
                ) || {}
              ).text
            }`}</p>
          )}
          <p>
            {remainingAttempts > 0
              ? `Te queda${
                  remainingAttempts === 1 ? "" : "n"
                } ${remainingAttempts} intento${
                  remainingAttempts === 1 ? "" : "s"
                }`
              : "Ya no te quedan mas intentos"}
          </p>
          {(question || {}).did_you_know && (
            <>
              <p>¿Sabías qué?</p>
              <p>{(question || {}).did_you_know}</p>
            </>
          )}
          {(question || {}).link && (
            <p>
              ¿Quieres saber más?{" "}
              <a
                href={(question || {}).link}
                target="_blank"
                rel="noopener noreferrer">
                Haz click aquí
              </a>
            </p>
          )}
        </>
      }
    />
  );
  return (
    <Row type="flex" justify="center">
      <Col span={22}>
        {(response || timedOut || error) && !loading ? (
          <>
            <Row
              style={{ height: "fit-content", padding: "8px 0px" }}
              type="flex">
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 14, offset: 5 }}
                xl={{ span: 12, offset: 6 }}>
                {error ? networkErrorAlert : alert}{" "}
              </Col>
            </Row>
            <Row
              style={{ height: "fit-content", padding: "8px 0px 16px 0px" }}
              type="flex">
              <Col span={24} style={{ textAlign: "center" }}>
                {!error && (
                  <Button
                    type="primary"
                    onClick={nextQuestion}
                    disabled={validatingAnswer}>
                    {remainingAttempts ? "Siguiente pregunta" : "Continuar"}
                  </Button>
                )}
              </Col>
            </Row>
          </>
        ) : loading ? (
          <div style={{ height: "174px" }} />
        ) : (
          <Timer
            onTimedOut={onTimedOut}
            stop={answered}
            start={start}
            loading={loading}
          />
        )}
        <QuestionTitle
          category={(question || {}).category}
          title={(question || {}).title}
          loading={loading}
        />
        <QuestionOptions
          loading={loading}
          options={(question || {}).options}
          selectOptionHandler={selectOptionHandler}
          answered={answered}
          selectedOption={selectedOption}
          validatingAnswer={validatingAnswer}
          timedOut={timedOut}
          response={response}
        />
      </Col>
    </Row>
  );
};

export default ShowQuestion;
