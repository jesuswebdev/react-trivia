import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Aux from '../../components/aux/Aux';
import * as homeActions from '../../state/ui/home/actions';

class Home extends Component {

  componentDidMount() {
    if (!this.props.success && !this.props.pingError) {
      this.props.pingServer();
    }
  }

  render() {
    return (
      <Aux>
        <div className="columns is-mobile is-tablet is-desktop is-centered">
          <div className="column is-10-mobile is-8-tablet is-6-desktop">
            <h1 className="title is-1 has-text-centered">React Trivia</h1>
            <h1 className="subtitle is-5 has-text-centered">El Juego de Preguntas</h1>
            <Link
              to="/nuevo"
              className="button is-info is-large is-fullwidth is-rounded">
              Jugar
            </Link>
            <Link
              to="/posiciones"
              style={{margin: '12px 0px'}}
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
        <div className="tags has-addons" style={{paddingTop: '100px', justifyContent: 'center'}}>
          <span className="tag is-dark">Servidor</span>
          <span className={['tag', 
          this.props.loading ? 'is-info': '',
          this.props.success ? 'is-success' : '',
          this.props.pingError ? 'is-danger' : ''].join(' ')}>{this.props.status}</span>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.ui.home.status,
    loading: state.ui.home.loading,
    pingError: state.ui.home.error,
    success: state.ui.home.success
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pingServer: () => { dispatch(homeActions.pingServer()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
