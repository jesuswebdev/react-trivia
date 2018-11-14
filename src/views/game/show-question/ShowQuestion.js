import React from "react";
import Timer from "../../../components/timer/Timer";
import QuestionOptions from "../question-options/QuestionOptions";
import QuestionTitle from "../question-title/QuestionTitle";
import { Row, Col, Button, Alert, Icon } from "antd";

const ShowQuestion = props => {
  const correctAnswer = props.question.options.find(
    option => option.correct_answer
  ).text;

  const alert = (
    <Alert
      showIcon
      message={`Respuesta ${props.correct ? "" : "in"}correcta`}
      type={props.answered && props.correct ? "success" : "error"}
      description={
        props.answered && !props.correct
          ? `La respuesta correcta era: ${correctAnswer}`
          : ""
      }
    />
  );
  return (
    <Row type="flex" justify="center">
      <Col span={20}>
        {props.answered ? (
          <Row style={{ minHeight: "174px" }}>
            <Col span={6} />
            <Col span={12}>{alert} </Col>
            <Col span={6} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={props.reset}>
                Continuar <Icon type="right" />
              </Button>
            </Col>
          </Row>
        ) : (
          <Timer />
        )}
        <QuestionTitle title={props.question.title} />
        <QuestionOptions
          options={props.question.options}
          selectOptionHandler={props.selectOptionHandler}
          answered={props.answered}
          selectedOption={props.selectedOption}
          questionId={props.question._id}
        />
      </Col>
    </Row>
  );
};

export default ShowQuestion;
