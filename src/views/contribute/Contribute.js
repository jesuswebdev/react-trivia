import React, { Component } from "react";
import { http } from "../../utils";
import ContributeForm from "./contribute-form/ContributeForm";
import { message } from "antd";

class Contribute extends Component {
  state = {
    categories: [],
    loadingCategories: false,
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    this.setState(
      { loadingCategories: true, error: false, errorMessage: "" },
      async () => {
        try {
          const {
            data: { categories }
          } = await http.get("/category");
          this.setState({ categories, loadingCategories: false });
        } catch (error) {
          this.setState({
            loadingCategories: false,
            error: true,
            errorMessage: "Ocurrió un error al intentar cargar las categorías"
          });
        }
      }
    );
  }

  questionSent = () => message.success("Tu pregunta se envió con éxito");

  submitQuestion = (question, setSubmitting, reset) => {
    setSubmitting(true);
    this.setState({ error: false, errorMessage: "" }, async () => {
      try {
        await http.post("/questions", question);
        setSubmitting(false);
        this.questionSent();
        reset();
      } catch ({ response: { data } }) {
        this.setState({
          error: true,
          errorMessage: "Ocurrió un error al intentar enviar tu pregunta"
        });
        setSubmitting(false);
      }
    });
  };

  render() {
    const { loadingCategories, categories, error, errorMessage } = this.state;
    return (
      <ContributeForm
        loadingCategories={loadingCategories}
        categories={categories}
        submitHandler={this.submitQuestion}
        error={error}
        errorMessage={errorMessage}
      />
    );
  }
}

export default Contribute;
