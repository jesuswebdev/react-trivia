import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from "../../components/aux/Aux";

class Home extends Component {
  render() {
    let options = (
      <Aux>
        <Link
          to="/iniciarsesion"
          className="button is-link is-large is-fullwidth is-rounded">
          Iniciar Sesión
        </Link>
        <br />
        <Link
          to="/registro"
          className="button is-link is-large is-fullwidth is-rounded">
          Registrarme
        </Link>
        <br />
        <Link
          to="/posiciones"
          className="button is-link is-large is-fullwidth is-rounded">
          Tabla de Posiciones
        </Link>
      </Aux>
    );

    if (this.props.isAuthenticated) {
      options = (
        <Aux>
          <Link
            to="/nuevo"
            className="button is-link is-large is-fullwidth is-rounded">
            Juego Nuevo
          </Link>
          <br />
          <Link
            to="/posiciones"
            className="button is-link is-large is-fullwidth is-rounded">
            Tabla de Posiciones
          </Link>
        </Aux>
      );
    }

    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-8-tablet is-6-desktop">
          {options}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.token !== null
  };
};

export default connect(mapStateToProps)(Home);
