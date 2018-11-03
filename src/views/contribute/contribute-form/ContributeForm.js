import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

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

const ContributeForm = props => {
  return (
    <div className="columns is-centered">
      <div className="column is-10">
        <div className="box">
          <h1 className="subtitle is-4 has-text-centered">
            Proponer una pregunta nueva
          </h1>
          <hr />
          {props.error && <div className="notification is-danger has-text-centered">{props.errorMessage}</div>}
          <Formik
            initialValues={QuestionInitialValues}
            validationSchema={QuestionSchema}
            onSubmit={values => {
              let form = prepareForm(values);
              props.submitHandler(form);
            }}>
            {({ values, errors, touched, resetForm }) => (
              <Form>
                <div className="field">
                  <label className="label">Cuerpo de la pregunta:</label>
                  <div className="control">
                    <Field
                      name="title"
                      component="textarea"
                      className={[
                        "textarea",
                        errors.title && touched.title && "is-danger",
                        !errors.title && touched.title && "is-success"
                      ].join(" ")}
                      placeholder="Cuerpo de la pregunta..."
                      disabled={props.loading}
                    />
                  </div>
                  {errors.title &&
                    touched.title && (
                      <p className="help is-danger">{errors.title}</p>
                    )}
                </div>

                <div className="field is-horizontal">
                  <div className="field-body">
                    <FieldArray
                      name="options"
                      render={() =>
                        values.options.map(
                          (option, index) =>
                            index < 2 && (
                              <div className="field" key={index}>
                                <label className="label">
                                  Opción {index + 1}:
                                </label>
                                <div className="control">
                                  <Field
                                    name={`options.${index}.text`}
                                    value={option.text}
                                    className={[
                                      "input",
                                      ((errors.options || [])[index] || {})
                                        .text &&
                                        ((touched.options || [])[index] || {})
                                          .text &&
                                        "is-danger",
                                      !((errors.options || [])[index] || {})
                                        .text &&
                                        ((touched.options || [])[index] || {})
                                          .text &&
                                        "is-success"
                                    ].join(" ")}
                                    placeholder="Texto de la opción..."
                                    disabled={props.loading}
                                  />
                                </div>
                                {((errors.options || [])[index] || {}).text &&
                                  ((touched.options || [])[index] || {})
                                    .text && (
                                    <p className="help is-danger">
                                      {
                                        ((errors.options || [])[index] || {})
                                          .text
                                      }
                                    </p>
                                  )}
                              </div>
                            )
                        )
                      }
                    />
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-body">
                    <FieldArray
                      name="options"
                      render={() =>
                        values.options.map(
                          (option, index) =>
                            index >= 2 && (
                              <div className="field" key={index}>
                                <label className="label">
                                  Opción {index + 1}:
                                </label>
                                <div className="control">
                                  <Field
                                    name={`options.${index}.text`}
                                    value={option.text}
                                    className={[
                                      "input",
                                      ((errors.options || [])[index] || {})
                                        .text &&
                                        ((touched.options || [])[index] || {})
                                          .text &&
                                        "is-danger",
                                      !((errors.options || [])[index] || {})
                                        .text &&
                                        ((touched.options || [])[index] || {})
                                          .text &&
                                        "is-success"
                                    ].join(" ")}
                                    placeholder="Texto de la opción..."
                                    disabled={props.loading}
                                  />
                                </div>
                                {((errors.options || [])[index] || {}).text &&
                                  ((touched.options || [])[index] || {})
                                    .text && (
                                    <p className="help is-danger">
                                      {
                                        ((errors.options || [])[index] || {})
                                          .text
                                      }
                                    </p>
                                  )}
                              </div>
                            )
                        )
                      }
                    />
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <label className="label">Dificultad</label>
                      <div className="control">
                        <div
                          className={[
                            "select",
                            errors.difficulty &&
                              touched.difficulty &&
                              "is-danger",
                            !errors.difficulty &&
                              touched.difficulty &&
                              "is-success"
                          ].join(" ")}>
                          <Field
                            name="difficulty"
                            component="select"
                            disabled={props.loading}>
                            <option value="default" disabled>
                              Elije una dificultad
                            </option>
                            <option value="easy">Fácil</option>
                            <option value="medium">Media</option>
                            <option value="hard">Difícil</option>
                          </Field>
                        </div>
                      </div>
                      {errors.difficulty &&
                        touched.difficulty && (
                          <p className="help is-danger">{errors.difficulty}</p>
                        )}
                    </div>

                    <div className="field">
                      <label className="label">Categoria</label>
                      <div className="control">
                        <div
                          className={[
                            "select",
                            props.loadingCategories && "is-loading",
                            errors.category && touched.category && "is-danger",
                            !errors.category && touched.category && "is-success"
                          ].join(" ")}>
                          <Field
                            name="category"
                            component="select"
                            disabled={props.loading || props.loadingCategories}>
                            <option value="default" disabled>
                              Elije una categoría
                            </option>
                            {props.categories.map((category, index) => {
                              return (
                                <option key={index} value={category._id}>
                                  {category.title}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                      </div>
                      {errors.category &&
                        touched.category && (
                          <p className="help is-danger">{errors.category}</p>
                        )}
                    </div>

                    <div className="field">
                      <label className="label">Opción correcta</label>
                      <div className="control">
                        <div
                          className={[
                            "select",
                            errors.correct_answer &&
                              touched.correct_answer &&
                              "is-danger",
                            !errors.correct_answer &&
                              touched.correct_answer &&
                              "is-success"
                          ].join(" ")}>
                          <Field
                            name="correct_answer"
                            component="select"
                            disabled={props.loading}>
                            <option value="default" disabled>
                              Elije la opción correcta
                            </option>
                            <option value="0">Opción 1</option>
                            <option value="1">Opción 2</option>
                            <option value="2">Opción 3</option>
                            <option value="3">Opción 4</option>
                          </Field>
                        </div>
                      </div>
                      {errors.correct_answer &&
                        touched.correct_answer && (
                          <p className="help is-danger">
                            {errors.correct_answer}
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Enlace:</label>
                  <div className="control">
                    <Field
                      name="link"
                      className={[
                        "input",
                        errors.link && touched.link && "is-danger",
                        !errors.link && touched.link && "is-success"
                      ].join(" ")}
                      placeholder="https://es.wikipedia.org/wiki/trivia"
                      disabled={props.loading}
                    />
                  </div>
                  {errors.link &&
                    touched.link && (
                      <p className="help is-danger">{errors.link}</p>
                    )}
                </div>

                <div className="field">
                  <label className="label">Dato curioso:</label>
                  <div className="control">
                    <Field
                      name="did_you_know"
                      component="textarea"
                      className={[
                        "textarea",
                        errors.did_you_know &&
                          touched.did_you_know &&
                          "is-danger",
                        !errors.did_you_know &&
                          touched.did_you_know &&
                          "is-success"
                      ].join(" ")}
                      placeholder={`Ejemplo: Los antiguos Romanos usaban la palabra triviae para describir un camino que se dividía en dos. Triviae se formó de tri (tres) y viae (vías), que literalmente signifíca "tres caminos"`}
                      disabled={props.loading}
                    />
                  </div>
                  {errors.did_you_know &&
                    touched.did_you_know && (
                      <p className="help is-danger">{errors.did_you_know}</p>
                    )}
                </div>
                <div className="buttons">
                  <button
                    type="submit"
                    className={[
                      "button",
                      "is-info",
                      props.loading ? "is-loading" : null
                    ].join(" ")}
                    disabled={props.loadingCategories  || props.error}>
                    Enviar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm(QuestionInitialValues);
                    }}
                    className="button"
                    disabled={props.loading}>
                    Limpiar Formulario
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContributeForm;
