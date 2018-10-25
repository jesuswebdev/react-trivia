

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import NewGame from './views/new-game/NewGame';
import Game from './views/game/Game';
import Scoreboard from './views/scoreboard/Scoreboard';


class App extends Component {
  render() {

  	let routes = (
  			<Switch>
  				<Route path="/" exact component={Home} />
	    		<Route path="/iniciarsesion" component={Login} />
	    		<Route path="/registro" component={Register} />
	    		<Route path="/posiciones" component={Scoreboard} />
		    	<Redirect to="/" />
    		</Switch>
  		);

  	if (this.props.isAuthenticated) {
  		routes = (
  			<Switch>
  				<Route path="/" exact component={Home} />
	    		<Route path="/nuevo" component={NewGame} />
	    		<Route path="/jugar" component={Game} />
	    		<Route path="/posiciones" component={Scoreboard} />
		    	<Redirect to="/" />
    		</Switch>
  			);
  	}

    return (
    	<BrowserRouter>
    		<Layout>
    			{routes}
		    </Layout>
    	</BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.user.token !== null
	}
}

export default connect(mapStateToProps)(App);
