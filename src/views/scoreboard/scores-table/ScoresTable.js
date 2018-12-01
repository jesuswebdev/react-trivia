import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Select, Form, Alert, Breadcrumb } from "antd";

import { transformDate } from "../../../utils";

const columns = [
  { title: "#", key: "position", width: 20, render: (_, __, i) => i + 1 },
  { title: "Jugador", dataIndex: "user", width: 220 },
  {
    title: "Respuesta Correctas",
    dataIndex: "total_correct_answers",
    width: 150
  },
  {
    title: "Duración del Juego",
    dataIndex: "duration",
    width: 134,
    render: duration => `${duration} segundo${duration === 1 ? "" : "s"}`
  },
  {
    title: "Fecha",
    dataIndex: "createdAt",
    width: 148,
    render: date => transformDate(date)
  }
];

const FormItem = Form.Item;

const ScoresTable = props => {
  const Option = Select.Option;
  return (
    <Row type="flex" justify="center">
      <Col span={22}>
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
          <Form
            layout="inline"
            style={{ textAlign: "center", paddingBottom: "5px" }}>
            <FormItem label="Dificultad">
              <Select defaultValue="easy" onChange={props.selectDifficulty}>
                <Option value="easy">Fácil</Option>
                <Option value="medium">Media</Option>
                <Option value="hard">Difícil</Option>
              </Select>
            </FormItem>

            <FormItem label="Modo de Juego">
              <Select defaultValue="fast" onChange={props.selectMode}>
                <Option value="fast">Rápido</Option>
                <Option value="normal">Normal</Option>
                <Option value="extended">Extendido</Option>
              </Select>
            </FormItem>
          </Form>

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
