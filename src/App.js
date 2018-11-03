import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./views/home/Home";
import NewGame from "./views/new-game/NewGame";
import Game from "./views/game/Game";
import Scoreboard from "./views/scoreboard/Scoreboard";
import Contribute from "./views/contribute/Contribute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/nuevo" component={NewGame} />
            <Route path="/jugar" component={Game} />
            <Route path="/posiciones" component={Scoreboard} />
            <Route path="/contribuir" component={Contribute} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
