import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";
import { parseGameDuration } from "../../utils";

const GameFinished = ({ game }) => {
  console.log("props", game);
  const title = {
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "0"
  };
  const subtitle = {
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "24px"
  };
  return (
    <Row type="flex" justify="center">
      <Col xs={22} sm={16} md={16} lg={10}>
        <Card>
          <h1 style={title}>Se acabó el juego</h1>

          <h1 style={subtitle}>
            Respondiste {game.total_correct_answers} preguntas correctamente
          </h1>

          <h1 style={subtitle}>
            Tu tiempo: {parseGameDuration(game.duration)}
          </h1>

          <Link to="/nuevo">
            <Button
              type="primary"
              block
              style={{ marginBottom: "12px", marginTop: "24px" }}>
              Jugar otra vez
            </Button>
          </Link>
          <Link to="/">
            <Button type="primary" block>
              Ir al menú principal
            </Button>
          </Link>
        </Card>
      </Col>
    </Row>
  );
};

export default GameFinished;
