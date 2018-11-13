import React from "react";
import { Row, Col, Button } from "antd";

const QuestionOptions = ({ options, selectOptionHandler }) => {
  const optionsButtons = options.map(q => {
    return (
      <Col xs={24} sm={24} md={12} key={q.option_id}>
        <Button
          style={{ margin: "8px 0px" }}
          id={q.option_id}
          onClick={selectOptionHandler}
          size="large"
          type="primary"
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
