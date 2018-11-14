import React, { Component } from "react";
import { connect } from "react-redux";
import { http } from "../../utils";
import ContributeForm from "./contribute-form/ContributeForm";
import SuccessScreen from "./success-screen/SuccessScreen";
import { loadCategories } from "../../state/category/actions";
import {
  submitQuestion,
  resetSubmitQuestionState
} from "../../state/question/actions";

class Contribute extends Component {
  state = {
    categories: [],
    loadingCategories: false
  };
  componentDidMount() {
    this.props.loadCategories();
  }

  componentWillUnmount() {
    this.props.resetQuestionSent();
  }

  submitQuestion = question => {
    this.props.submitQuestion(question);
  };

  render() {
    return this.props.sent ? (
      <SuccessScreen reset={this.props.resetQuestionSent} />
    ) : (
      <ContributeForm
        loadingCategories={this.props.loadingCategories}
        categories={this.props.categories}
        submitHandler={this.submitQuestion}
        loading={this.props.loading}
        error={this.props.hasError}
        errorMessage={this.props.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    loadingCategories: state.ui.contribute.loadingCategories,
    hasError: state.ui.contribute.errorLoadingCategories,
    errorMessage: state.ui.contribute.errorMessageLoadingCategories,
    loading: state.ui.contribute.loading,
    sent: state.question.sent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => {
      dispatch(loadCategories());
    },
    submitQuestion: question => {
      dispatch(submitQuestion(question));
    },
    resetQuestionSent: () => {
      dispatch(resetSubmitQuestionState());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contribute);
