import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Breadcrumb, Descriptions, List } from "antd";
import DataProvider from "./provider";
import {
  transformDate,
  parseGameDuration,
  parseQuestionDuration
} from "../../utils";

const GameDetails = props => {
  return (
    <DataProvider
      id={props.match.params.id}
      render={({ loading, error, game = {} }) => (
        <Row type="flex" justify="center">
          <Col span={22}>
            <Breadcrumb style={{ paddingBottom: "16px" }}>
              <Breadcrumb.Item>
                <Link to="/">Inicio</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/top">Tabla de Clasificación</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Detalles del juego</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
              <Descriptions title="Detalles del juego">
                <Descriptions.Item label="Usuario">
                  {game.user}
                </Descriptions.Item>
                <Descriptions.Item label="Fecha">
                  {transformDate(game.created_at)}
                </Descriptions.Item>
                <Descriptions.Item label="Duración">
                  {parseGameDuration(game.duration)}
                </Descriptions.Item>
                <Descriptions.Item label="Preguntas respondidas correctamente">
                  {game.total_correct_answers}
                </Descriptions.Item>
              </Descriptions>
              <List
                itemLayout="vertical"
                size="large"
                header={<h3>Preguntas</h3>}
                dataSource={game.questions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={item.title} />
                    <Descriptions>
                      {item.answered && (
                        <Descriptions.Item label="Respondida correctamente">
                          {item.answered_correctly ? "Si" : "No"}
                        </Descriptions.Item>
                      )}
                      {item.timed_out && (
                        <Descriptions.Item label="Tiempo agotado">
                          {item.timed_out ? "Si" : "No"}
                        </Descriptions.Item>
                      )}
                      <Descriptions.Item label="Tiempo en responder">
                        {`${parseQuestionDuration(item.duration)}s`}
                      </Descriptions.Item>
                    </Descriptions>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      )}
    />
  );
};

export default GameDetails;
