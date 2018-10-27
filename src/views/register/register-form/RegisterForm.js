import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre es muy corto")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Debes introducir una dirección de correo válida")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La cotraseña es muy corta")
    .required("La contraseña es obligatoria")
});

const RegisterForm = props => {
  return (
    <div className="box">
      <h4 className="title is-size-4">Registrarme</h4>
      {props.error && <div className="notification is-danger has-text-centered">{props.errorMessage}</div>}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: ""
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          props.submitHandler(values);
          // setSubmitting(false);
        }}>
        {({ errors, touched }) => (
          <Form>
            <div className="field">
              <label className="label">Nombre de usuario</label>
              <div className="control">
                <Field
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Nombre de usuario..."
                  disabled={props.loading}
                />
                {errors.name && touched.name ? (
                  <p className="help is-danger">{errors.name}</p>
                ) : null}
              </div>
            </div>
            <div className="field">
              <label className="label">Correo Electrónico</label>
              <div className="control">
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Correo Electrónico..."
                  disabled={props.loading}
                />
                {errors.email && touched.email ? (
                  <p className="help is-danger">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control">
                <Field
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Contraseña..."
                  disabled={props.loading}
                />
                {errors.password && touched.password ? (
                  <p className="help is-danger">{errors.password}</p>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className={[
                "button",
                "is-link",
                "is-fullwidth",
                props.loading ? "is-loading" : null
              ].join(" ")}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
