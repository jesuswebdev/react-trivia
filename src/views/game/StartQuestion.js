import React from "react";
import { Row, Col, Card, Button, Spin } from "antd";

const StartQuestion = ({ question = {}, start, loading }) => {
  return (
    <Row type="flex" justify="center">
      <Col xs={22} sm={16} md={12} lg={10}>
        <Card style={{ textAlign: "center" }}>
          {loading ? (
            <Spin tip="Cargando pregunta..." style={{ padding: "30px 0px" }} />
          ) : (
            <>
              <h1
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  marginBottom: "0"
                }}>
                {`Pregunta número: ${question.number}`}
              </h1>
              <h1
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  marginBottom: "24px"
                }}>{`Categoria: ${question.category}`}</h1>
            </>
          )}

          <Button type="primary" onClick={start} disabled={loading} block>
            Continuar
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default StartQuestion;
