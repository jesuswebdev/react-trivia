import React, { Component } from "react";
import { http } from "../../utils";
import ContributeForm from "./contribute-form/ContributeForm";
import { message } from "antd";

class Contribute extends Component {
  state = {
    categories: [],
    loadingCategories: false,
    error: false
  };

  componentDidMount() {
    this.loadCategories();
  }

  questionSent = () => message.success("Tu pregunta se envió con éxito");

  loadCategories = () => {
    const loadingMessage = message.loading("Cargando categorías...", 0);
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
            error: {
              message: "Ocurrió un error al intentar cargar las categorías",
              description: (
                <p>
                  <span
                    onClick={this.loadCategories}
                    style={{ color: "#1890ff", cursor: "pointer" }}>
                    Haz click aquí
                  </span>{" "}
                  para intentar nuevamente
                </p>
              )
            }
          });
        } finally {
          loadingMessage();
        }
      }
    );
  };

  submitQuestion = (question, setSubmitting, reset) => {
    const loadingMessage = message.loading("Enviando...", 0);
    setSubmitting(true);
    this.setState({ error: false, errorMessage: "" }, async () => {
      try {
        await http.post("/questions", question);
        setSubmitting(false);
        loadingMessage();
        this.questionSent();
        reset();
      } catch ({ response: { data } }) {
        this.setState({
          error: {
            message:
              "Ocurrió un error al intentar enviar tu pregunta. Intentalo de nuevo."
          }
        });
        loadingMessage();
        setSubmitting(false);
      }
    });
  };

  render() {
    const { loadingCategories, categories, error } = this.state;
    return (
      <ContributeForm
        loadingCategories={loadingCategories}
        categories={categories}
        submitHandler={this.submitQuestion}
        error={error}
      />
    );
  }
}

export default Contribute;
