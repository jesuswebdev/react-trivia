import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as UserActions from "../../state/user/actions";

class Login extends Component {
  state = {
    email: {
      value: ""
    },
    password: {
      value: ""
    }
  };

  onChangeHandler = event => {
    this.setState({ [`${event.target.name}`]: { value: event.target.value } });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    let loginData = {
      email: this.state.email.value,
      password: this.state.password.value
    };
    this.props.submitLogin(loginData);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    let errorMessage = null;
    if (this.props.hasError) {
      errorMessage = (
        <div className="notification is-danger">{this.props.errorMessage}</div>
      );
    }
    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-8-mobile is-6-tablet is-6-desktop">
          <div className="box">
            <h4 className="title is-size-4 has-text-centered">
              Iniciar Sesión
            </h4>
            {this.props.hasError && errorMessage}
            <form onSubmit={this.onSubmitHandler}>
              <input
                type="email"
                className="input"
                name="email"
                value={this.state.email.value}
                onChange={this.onChangeHandler}
                disabled={this.props.isLoading}
              />
              <input
                type="password"
                className="input"
                name="password"
                value={this.state.password.value}
                onChange={this.onChangeHandler}
                disabled={this.props.isLoading}
              />
              <button
                type="submit"
                className={[
                  "button",
                  "is-primary",
                  this.props.isLoading ? "is-loading" : ""
                ].join(" ")}>
                Enviar
              </button>
            </form>
          </div>
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
