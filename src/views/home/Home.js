import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Columns, Column, Typography } from '../../components/UI';
import ServerStatusLabel from "../../components/server-status-label/ServerStatusLabel";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Columns mobile tablet desktop centered>
          <Column mobile={10} tablet={8} desktop={6}>
            <Typography type="title" size={1} centered>
              React Trivia
            </Typography>
            <Typography type="subtitle" size={5} centered>
              El Juego de Preguntas
            </Typography>
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
          </Column>
        </Columns>
        <ServerStatusLabel />
      </Fragment>
    );
  }
}

export default Home;
