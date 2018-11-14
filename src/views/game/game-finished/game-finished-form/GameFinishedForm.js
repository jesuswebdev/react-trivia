import React from "react";
import { Formik } from "formik";
import { Form, Input, Button } from "antd";
import * as Yup from "yup";

const victorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre es muy corto")
    .max(16, "El nombre es muy largo")
    .required("Debes introducir un nombre")
    .lowercase()
    .notOneOf(["admin", "administrador"], "Ese nombre no es válido")
});

const FormItem = Form.Item;

const VictoryForm = props => {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={victorySchema}
      onSubmit={({ name }) => {
        props.submitHandler(name);
      }}>
      {({
        errors,
        touched,
        values,
        handleSubmit,
        handleChange,
        handleBlur
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            required
            label="Introduce tu nombre"
            hasFeedback
            validateStatus={errors.name && touched.name ? "error" : ""}
            help={(touched.name && errors.name) || ""}>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Introduce tu nombre"
              disabled={props.loading}
            />
          </FormItem>
          <Button
            htmlType="submit"
            type="primary"
            loading={props.loading}
            block>
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VictoryForm;
