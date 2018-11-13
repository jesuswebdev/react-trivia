import React from "react";
import { Row, Col, Card, Button } from "antd";

const StartQuestion = ({
  currentQuestion,
  questionCount,
  category,
  startQuestion
}) => {
  return (
    <Row type="flex" justify="center">
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card>
          <h1
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "0"
            }}>
            {`Pregunta ${currentQuestion} de ${questionCount}`}
          </h1>
          <h1
            style={{
              fontSize: "16px",
              textAlign: "center",
              marginBottom: "24px"
            }}>{`Categoria: ${category}`}</h1>

          <Button type="primary" onClick={startQuestion} block>
            Continuar
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default StartQuestion;
