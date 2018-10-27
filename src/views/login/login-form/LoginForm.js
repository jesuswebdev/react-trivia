import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña es muy corta")
    .required("La contraseña es obligatoria")
});

const LoginForm = props => {
  return (
    <div className="box">
      <h4 className="title is-size-4">Iniciar Sesión</h4>
      {props.error && <div className="notification is-danger has-text-centered">{props.errorMessage}</div>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={values => {
            props.submitHandler(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <div className="field">
              <label className="label">Correo Electrónico</label>
              <div className="control">
                <Field
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Correo electrónico..."
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

export default LoginForm;
