import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      arial-label="main-navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          React Trivia
        </Link>
      </div>
    </nav>
  );
};

export default Header;
