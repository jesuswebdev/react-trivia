import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ServerStatusLabel from "../../components/server-status-label/ServerStatusLabel";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className="columns is-mobile is-tablet is-desktop is-centered">
          <div className="column is-10-mobile is-8-tablet is-6-desktop">
            <h1 className="title is-1 has-text-centered">React Trivia</h1>
            <h1 className="subtitle is-5 has-text-centered">
              El Juego de Preguntas
            </h1>
            <Link
              to="/nuevo"
              className="button is-info is-large is-fullwidth is-rounded">
              Jugar
            </Link>
            <Link
              to="/posiciones"
              style={{ margin: "12px 0px" }}
              className="button is-info is-large is-fullwidth is-rounded">
              Top 10
            </Link>
            <Link
              to="/contribuir"
              className="button is-info is-large is-fullwidth is-rounded">
              Contribuir
            </Link>
          </div>
        </div>
        <ServerStatusLabel />
      </Fragment>
    );
  }
}

export default Home;
