import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { http } from "../../utils";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Alert,
  message,
  Breadcrumb
} from "antd";
import { Formik, FastField } from "formik";
import * as Yup from "yup";

const FormItem = Form.Item;

export class NewGame extends Component {
  state = {
    loading: false,
    error: false,
    response: null
  };

  onSubmitHandler = ({ name }) => {
    const loadingMessage = message.loading("Creando el juego...", 0);
    this.setState({ loading: true, error: false }, async () => {
      let response;
      let errored = false;
      try {
        const { data } = await http.post("/games", { name });
        localStorage.setItem("username", name);
        response = data;
      } catch (error) {
        errored = true;
      } finally {
        loadingMessage();
        this.setState({ loading: false, error: errored, response });
      }
    });
  };

  render() {
    const { loading, error, response } = this.state;
    if (!!response) {
      return <Redirect to={{ pathname: "/jugar", state: response }} />;
    }

    return (
      <Fragment>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Breadcrumb style={{ paddingBottom: "16px" }}>
              <Breadcrumb.Item>
                <Link to="/">Inicio</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Juego Nuevo</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={22} sm={16} md={16} lg={8}>
            <Card>
              <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
                Juego nuevo
              </h1>
              {error && (
                <Alert
                  type="error"
                  showIcon
                  closable
                  message="Error"
                  description="Ocurrió un error al intentar conectar con el servidor"
                />
              )}
              <Formik
                enableReinitialize
                initialValues={{ name: localStorage.getItem("username") || "" }}
                validationSchema={Yup.object().shape({
                  name: Yup.string()
                    .trim()
                    .min(2, "El nombre es muy corto")
                    .max(32, "El nombre es muy largo")
                    .required("Debes escribir un nombre de usuario")
                })}
                onSubmit={this.onSubmitHandler}
                render={props => {
                  return (
                    <>
                      <FastField
                        name="name"
                        render={({ field, form }) => (
                          <FormItem
                            label="Nombre"
                            hasFeedback
                            validateStatus={
                              form.touched.name && form.errors.name
                                ? "error"
                                : ""
                            }
                            help={
                              (form.touched.name && form.errors.name) || ""
                            }>
                            <Input
                              {...field}
                              disabled={props.isSubmitting}
                              placeholder="Nombre de usuario"
                            />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="primary"
                        block
                        onClick={props.handleSubmit}
                        disabled={
                          (props.touched.name && props.errors.name) || loading
                        }>
                        Comenzar
                      </Button>
                    </>
                  );
                }}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default NewGame;
