import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

const Home = () => {
  return (
    <Row type="flex" justify="center">
      <Col xs={22} sm={16} md={12} lg={12}>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            margin: "32px 0px 0px 0px"
          }}>
          React Trivia
        </h1>
        <h1
          style={{
            fontSize: "1.25rem",
            textAlign: "center"
          }}>
          El Juego de Preguntas
        </h1>
        <Button type="primary" size="large" block>
          <Link to="/nuevo">Jugar</Link>
        </Button>
        <Button
          type="primary"
          size="large"
          block
          style={{ margin: "12px 0px" }}>
          <Link to="/top">Top 10</Link>
        </Button>
        <Button type="primary" size="large" block>
          <Link to="/contribuir">Contribuir</Link>
        </Button>
      </Col>
    </Row>
  );
};

export default Home;
