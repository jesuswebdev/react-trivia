import React from "react";
import { Row, Col, Button } from "antd";

const QuestionOptions = ({
  options,
  selectOptionHandler,
  answered,
  validatingAnswer,
  timedOut,
  response = {}
}) => {
  const getButtonColor = (answered, optionId, response) => {
    const correct = { backgroundColor: "#52c41a", borderColor: "#52c41a" };
    const incorrect = { backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" };
    // answered but incorrect - incorrect option
    if (
      answered &&
      !response.result &&
      optionId === response.user_selected_option_id
    ) {
      return incorrect;
    }
    // answered but incorrect - correct option
    if (
      answered &&
      !response.result &&
      optionId === response.correct_option_id
    ) {
      return correct;
    }
    //answered and correct
    if (
      answered &&
      !!response.result &&
      optionId === response.correct_option_id
    ) {
      return correct;
    }
    return {};
  };
  const optionsButtons = options.map(q => {
    return (
      <Col xs={24} sm={24} md={12} key={q.option_id}>
        <Button
          style={{
            margin: "8px 0px",
            ...getButtonColor(answered, q.option_id, response)
          }}
          id={q.option_id}
          onClick={() => {
            if (answered) {
              return;
            }
            selectOptionHandler(q.option_id);
          }}
          size="large"
          type={"primary"}
          disabled={
            (answered &&
              q.option_id !== response.correct_option_id &&
              (answered && q.option_id !== response.user_selected_option_id)) ||
            validatingAnswer ||
            timedOut
          }
          block>
          {q.text}
        </Button>
      </Col>
    );
  });

  return (
    <Row type="flex" justify="center" gutter={16}>
      {optionsButtons}
    </Row>
  );
};

export default QuestionOptions;
