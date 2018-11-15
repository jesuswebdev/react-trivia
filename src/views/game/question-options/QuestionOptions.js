import React, { Component } from "react";
import { Row, Col, Button } from "antd";

class QuestionOptions extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.questionId !== this.props.questionId) {
      return true;
    }

    if (nextProps.answered !== this.props.answered) {
      return true;
    }

    return false;
  }

  render() {
    const {
      options,
      selectOptionHandler,
      answered,
      selectedOption
    } = this.props;
    const optionsButtons = options.map(q => {
      return (
        <Col xs={24} sm={24} md={12} key={q.option_id}>
          <Button
            style={{ margin: "8px 0px" }}
            id={q.option_id}
            onClick={answered ? () => {} : selectOptionHandler}
            size="large"
            type={answered ? "primary" : "default"}
            disabled={answered && q.option_id !== selectedOption}
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
  }
}

export default QuestionOptions;
