import React from "react";
import { Link } from "react-router-dom";
import { Formik, FastField, Field } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Select,
  Button,
  Alert,
  Breadcrumb
} from "antd";

const QuestionSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(16, "La pregunta es muy corta")
    .required("El cuerpo de la pregunta no puede quedar vacío"),
  options: Yup.array().of(
    Yup.object().shape({
      text: Yup.string()
        .trim()
        .required("Esta opción no puede quedar vacía")
    })
  ),
  category: Yup.string().notOneOf(["default"], "Debes elegir una categoría"),
  difficulty: Yup.string().oneOf(
    ["easy", "medium", "hard"],
    "Debes elegir una dificultad"
  ),
  correct_answer: Yup.string().oneOf(
    ["0", "1", "2", "3"],
    "Debes elegir una opción correcta"
  ),
  link: Yup.string().url("Debes introducir una URL válida"),
  did_you_know: Yup.string()
});

const prepareForm = values => {
  let form = {
    title: values.title,
    options: values.options.map((option, index) => {
      return {
        text: option.text,
        correct_answer: parseInt(values.correct_answer, 10) === index
      };
    }),
    category: values.category,
    difficulty: values.difficulty
  };
  if (values.link) {
    form.link = values.link;
  }
  if (values.did_you_know) {
    form.did_you_know = values.did_you_know;
  }
  return form;
};

const QuestionInitialValues = {
  title: "",
  options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
  category: "default",
  difficulty: "default",
  link: "",
  did_you_know: "",
  correct_answer: "default"
};

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const ContributeForm = props => {
  const categories = props.categories.map((category, index) => {
    return (
      <Option key={index} value={category._id}>
        {category.title}
      </Option>
    );
  });

  return (
    <Row type="flex" justify="center">
      <Col span={22}>
        <Breadcrumb style={{ paddingBottom: "16px" }}>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Contribuir</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Proponer una pregunta nueva
          </h1>
          {props.error && (
            <Alert type="error" message={props.errorMessage} banner />
          )}
          <Formik
            initialValues={QuestionInitialValues}
            validationSchema={QuestionSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const form = prepareForm(values);
              const reset = () => resetForm(QuestionInitialValues);
              props.submitHandler(form, setSubmitting, reset);
            }}>
            {({
              values,
              errors,
              touched,
              resetForm,
              isSubmitting,
              handleSubmit,
              setFieldValue
            }) => (
              <Form onSubmit={handleSubmit}>
                <FastField
                  name="title"
                  render={({ field, form }) => (
                    <FormItem
                      required
                      label="Cuerpo de la pregunta"
                      hasFeedback
                      validateStatus={
                        form.touched.title && form.errors.title ? "error" : ""
                      }
                      help={(form.touched.title && form.errors.title) || ""}>
                      <TextArea
                        {...field}
                        placeholder="Cuerpo de la pregunta"
                        disabled={isSubmitting}
                      />
                    </FormItem>
                  )}
                />

                <Row gutter={16}>
                  {values.options.map((option, index) => {
                    const inputError = (
                      ((errors || {}).options || [])[index] || {}
                    ).text;
                    const inputTouched = ((touched || {}).options || [])[index];
                    return (
                      <Col xs={24} md={12} key={index}>
                        <FastField
                          name={`options[${index}].text`}
                          render={({ field, form }) => (
                            <FormItem
                              required
                              label={`Opción ${index + 1}`}
                              hasFeedback
                              validateStatus={
                                inputTouched && inputError ? "error" : ""
                              }
                              help={(inputTouched && inputError) || ""}>
                              <Input
                                {...field}
                                placeholder={`Opción ${index + 1}`}
                                disabled={isSubmitting}
                              />
                            </FormItem>
                          )}
                        />
                      </Col>
                    );
                  })}
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={8}>
                    <FastField
                      name="difficulty"
                      render={({ field, form }) => (
                        <FormItem
                          required
                          label="Dificultad"
                          hasFeedback
                          validateStatus={
                            form.touched.difficulty && form.errors.difficulty
                              ? "error"
                              : ""
                          }
                          help={
                            (form.touched.difficulty &&
                              form.errors.difficulty) ||
                            ""
                          }>
                          <Select
                            {...field}
                            disabled={isSubmitting}
                            defaultValue="default"
                            onSelect={option =>
                              setFieldValue("difficulty", option)
                            }>
                            <Option value="default" disabled>
                              Elige una dificultad
                            </Option>
                            <Option value="easy">Fácil</Option>
                            <Option value="medium">Media</Option>
                            <Option value="hard">Difícil</Option>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Field
                      name="category"
                      render={({ field, form }) => (
                        <FormItem
                          required
                          label="Categoría"
                          hasFeedback
                          validateStatus={
                            form.touched.category && form.errors.category
                              ? "error"
                              : ""
                          }
                          help={
                            (form.touched.category && form.errors.category) ||
                            ""
                          }>
                          <Select
                            {...field}
                            disabled={isSubmitting || props.loadingCategories}
                            defaultValue="default"
                            onSelect={option =>
                              setFieldValue("category", option)
                            }>
                            <Option value="default" disabled>
                              Elige una categoría
                            </Option>
                            {categories}
                          </Select>
                        </FormItem>
                      )}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Field
                      name="correct_answer"
                      render={({ field, form }) => (
                        <FormItem
                          required
                          label="Opción correcta"
                          hasFeedback
                          validateStatus={
                            form.touched.correct_answer &&
                            form.errors.correct_answer
                              ? "error"
                              : ""
                          }
                          help={
                            (form.touched.correct_answer &&
                              form.errors.correct_answer) ||
                            ""
                          }>
                          <Select
                            disabled={isSubmitting}
                            defaultValue="default"
                            {...field}
                            onSelect={option =>
                              setFieldValue("correct_answer", option)
                            }>
                            <Option value="default" disabled>
                              Elige una opción
                            </Option>
                            <Option value="0">Opción 1</Option>
                            <Option value="1">Opción 2</Option>
                            <Option value="2">Opción 3</Option>
                            <Option value="3">Opción 4</Option>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </Col>
                </Row>

                <FastField
                  name="link"
                  render={({ field, form }) => (
                    <FormItem
                      label="Enlace"
                      hasFeedback
                      validateStatus={
                        form.touched.link && form.errors.link ? "error" : ""
                      }
                      help={(form.touched.link && form.errors.link) || ""}>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="https://es.wikipedia.org/wiki/trivia"
                      />
                    </FormItem>
                  )}
                />

                <FastField
                  name="did_you_know"
                  render={({ field, form }) => (
                    <FormItem
                      label="Dato curioso"
                      hasFeedback
                      validateStatus={
                        form.touched.did_you_know && form.errors.did_you_know
                          ? "error"
                          : ""
                      }
                      help={
                        (form.touched.did_you_know &&
                          form.errors.did_you_know) ||
                        ""
                      }>
                      <TextArea
                        {...field}
                        placeholder={`Ejemplo: Los antiguos Romanos usaban la palabra triviae para describir un camino que se dividía en dos. Triviae se formó de tri (tres) y viae (vías), que literalmente signifíca "tres caminos"`}
                        disabled={isSubmitting}
                      />
                    </FormItem>
                  )}
                />

                <Button
                  htmlType="submit"
                  type="primary"
                  loading={isSubmitting}
                  style={{ marginRight: "8px" }}>
                  Enviar
                </Button>
                <Button
                  disabled={isSubmitting}
                  onClick={() => resetForm(QuestionInitialValues)}>
                  Limpiar formulario
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Col>
    </Row>
  );
};

export default ContributeForm;
