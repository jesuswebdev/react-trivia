import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-8-tablet is-6-desktop">
        <h1 className="title is-1 has-text-centered">React Trivia</h1>
        <h1 className="subtitle is-5 has-text-centered">El Juego de Preguntas</h1>
        <Link
          to="/nuevo"
          className="button is-info is-large is-fullwidth is-rounded">
          Jugar
        </Link>
        <br />
        <Link
          to="/posiciones"
          className="button is-info is-large is-fullwidth is-rounded">
          Top 10
        </Link>
      </div>
    </div>
  );
}

export default Home;
