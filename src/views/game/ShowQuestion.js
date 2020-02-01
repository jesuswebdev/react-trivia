import React from "react";
import Timer from "../../components/timer/Timer";
import QuestionOptions from "./question/Options";
import QuestionTitle from "./question/Title";
import { Row, Col, Button, Alert, Icon } from "antd";

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
  retry
}) => {
  const networkErrorAlert = (
    <Alert
      showIcon
      message="Error de red"
      type="error"
      description={
        <>
          <p>Tu respuesta no se pudo enviar</p>
          <p>
            <span
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={retry}>
              Haz click aquí
            </span>{" "}
            para intentar otra vez
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
                } para equivocarte`
              : "Ya no te quedan mas intentos"}
          </p>
          {question.link && (
            <p>
              ¿Quieres saber más?{" "}
              <a href={question.link} target="_blank" rel="noopener noreferrer">
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
      <Col span={20}>
        {response || timedOut || error ? (
          <Row style={{ minHeight: "174px" }}>
            <Col span={6} />
            <Col span={12}>{error ? networkErrorAlert : alert} </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              {!error && (
                <Button
                  type="primary"
                  onClick={nextQuestion}
                  disabled={validatingAnswer}>
                  Continuar <Icon type="right" />
                </Button>
              )}
            </Col>
          </Row>
        ) : (
          <Timer onTimedOut={onTimedOut} stop={answered} />
        )}
        <QuestionTitle title={question.title} />
        <QuestionOptions
          options={question.options}
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
