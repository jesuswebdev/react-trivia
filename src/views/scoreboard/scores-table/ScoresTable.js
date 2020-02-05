import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Alert, Breadcrumb } from "antd";

import { parseGameDuration } from "../../../utils";

const columns = [
  { title: "#", key: "position", dataIndex: "position", width: 50 },
  { title: "Jugador", dataIndex: "user", width: 250 },
  {
    title: "Respuesta Correctas",
    dataIndex: "total_correct_answers",
    width: 171
  },
  {
    title: "Duración del Juego",
    dataIndex: "duration",
    width: 150,
    render: duration => parseGameDuration(duration)
  },
  {
    title: "Ir al juego",
    dataIndex: "_id",
    width: 100,
    render: (id, game) => {
      return (
        <Link
          to={{ pathname: `/juego/${id}`, state: { position: game.position } }}>
          Ir
        </Link>
      );
    }
  }
];

const ScoresTable = props => {
  return (
    <Row type="flex" justify="center">
      <Col span={20}>
        <Breadcrumb style={{ paddingBottom: "16px" }}>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tabla de Clasificación</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Tabla de Clasificación
          </h1>
          {props.error && (
            <Alert
              type="error"
              message="Ocurrió un error al intentar cargar la tabla de clasificación"
              banner
            />
          )}
          <Table
            columns={columns}
            dataSource={props.stats}
            loading={props.loading}
            rowKey={item => item._id}
            pagination={{ hideOnSinglePage: true }}
            locale={{ emptyText: "No hay nada para mostrar" }}
            scroll={{ x: 800 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ScoresTable;
