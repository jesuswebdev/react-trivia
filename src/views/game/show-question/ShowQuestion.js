import React from "react";
import Timer from "../../../components/timer/Timer";
import QuestionOptions from "../question-options/QuestionOptions";
import QuestionTitle from "../question-title/QuestionTitle";
import { Row, Col } from "antd";

const ShowQuestion = props => {
  return (
    <Row type="flex" justify="center">
      <Col span={20}>
        <Timer />
        <QuestionTitle title={props.question.title} />
        <QuestionOptions
          options={props.question.options}
          selectOptionHandler={props.selectOptionHandler}
        />
      </Col>
    </Row>
  );
};

export default ShowQuestion;
