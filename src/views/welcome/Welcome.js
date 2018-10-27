import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as uiRegisterActions from "../../state/ui/register/actions";

class Welcome extends Component {
  componentWillUnmount() {
    this.props.resetRegistered();
  }

  render() {
    if (!this.props.name) {
      return <Redirect to="/registro" />;
    }
    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-6-tablet is-6-desktop">
          <div className="box">
            <h1 className="title is-2 has-text-centered">
              ¡Hola {this.props.name}!
            </h1>
            <h1 className="subtitle is-4 has-text-centered">
              Gracias por registrarte en nuestra plataforma. Ahora puedes
              iniciar sesión y empezar a jugar.
            </h1>
            <Link
              to="/iniciarsesion"
              className="button is-info is-large is-fullwidth">
              Iniciar sesion
            </Link>{" "}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetRegistered: () => {
      dispatch(uiRegisterActions.uiResetRegistered());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
