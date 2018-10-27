import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as uiLogoutModalActions from '../state/ui/logout-modal/actions';

class Header extends Component {

  handleMenuToggle = () => {
    document.getElementById('app-navbar-menu').classList.toggle('is-active');
    document.getElementById('app-navbar-burger').classList.toggle('is-active');
  }

  handleLogout = () => {
    this.handleMenuToggle();
    this.props.openLogoutModal();
  }

  render() {
    return (
      <nav className="navbar is-dark" role="navigation" arial-label="main-navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            React Trivia
          </Link>
          {this.props.name && (
            <span
              role="button"
              id="app-navbar-burger"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="app-navbar-menu"
              onClick={this.handleMenuToggle}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </span>
          )}
        </div>
        {this.props.name && (
          <div className="navbar-menu" id="app-navbar-menu">
            <div className="navbar-end">
              <div
                className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">{this.props.name}</div>
                <div className="navbar-dropdown">
                  <a className="navbar-item" onClick={this.handleLogout}>Cerrar Sesión</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
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
    openLogoutModal: () => { dispatch(uiLogoutModalActions.openLogoutModal()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
