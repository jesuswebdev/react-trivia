import React, { Component } from "react";
import RegisterForm from "./register-form/RegisterForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as userActions from "../../state/user/actions";

class Register extends Component {
  submitHandler = val => {
    this.props.submitRegister(val);
  };

  render() {
    if (this.props.registered) {
      return <Redirect to="/bienvenido" />;
    }
    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-6-tablet is-6-desktop">
          <RegisterForm
            submitHandler={this.submitHandler}
            loading={this.props.isLoading}
            error={this.props.hasError}
            errorMessage={this.props.errorMessage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.register.loading,
    hasError: state.ui.register.error,
    errorMessage: state.ui.register.errorMessage,
    registered: state.ui.register.registered
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitRegister: data => {
      dispatch(userActions.submitRegister(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
