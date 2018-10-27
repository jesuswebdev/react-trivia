import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as UserActions from "../../state/user/actions";
import LoginForm from "./login-form/LoginForm";

class Login extends Component {
  onSubmitHandler = data => {
    this.props.submitLogin(data);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-6-tablet is-6-desktop">
          <LoginForm
            submitHandler={this.onSubmitHandler}
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
    isLoading: state.ui.login.loading,
    hasError: state.ui.login.error,
    errorMessage: state.ui.login.errorMessage,
    isAuthenticated: state.user.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitLogin: loginData => {
      dispatch(UserActions.submitLogin(loginData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
