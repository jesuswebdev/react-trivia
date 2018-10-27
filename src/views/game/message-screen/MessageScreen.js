import React from "react";
import { Link } from "react-router-dom";

const MessageScreen = props => {
  return (
    <div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-6-tablet is-6-desktop">
        <div className="box">
          <h1 className="title is-2 has-text-centered">
            {props.children.title}
          </h1>
          {props.children.subtitle && (
            <h1 className="subtitle is-4 has-text-centered">
              {props.children.subtitle}
            </h1>
          )}
          <Link
            to="/nuevo"
            className="button is-info is-large is-fullwidth is-rounded"
            style={{ marginBottom: "15px", marginTop: "50px" }}>
            Jugar otra vez
          </Link>
          <Link
            to="/"
            className="button is-info is-large is-fullwidth is-rounded">
            Ir al menú principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessageScreen;
