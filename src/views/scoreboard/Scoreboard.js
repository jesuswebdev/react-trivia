import React, { Component } from "react";
import { connect } from "react-redux";
import { getGameStats } from "../../state/game/actions";
import {
  selectMode,
  selectDifficulty
} from "../../state/ui/game-stats/actions";
import ScoresTable from "./scores-table/ScoresTable";

class Scoreboard extends Component {
  componentDidMount() {
    this.props.loadStats();
  }

  render() {
    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-10-tablet is-10-desktop">
          <div className="box">
            <h1 className="subtitle is-6 has-text-centered">
              Tabla de Posiciones
              <select
                value={this.props.selectedDifficulty}
                onChange={({ target: { value } }) =>
                  this.props.selectDifficulty(value)
                }>
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
              </select>
              <select
                value={this.props.selectedMode}
                onChange={({ target: { value } }) =>
                  this.props.selectMode(value)
                }>
                <option value="fast">Rápido</option>
                <option value="normal">Normal</option>
                <option value="extended">Extendido</option>
              </select>
            </h1>
            {this.props.stats && (
              <ScoresTable>
                {
                  this.props.stats[this.props.selectedDifficulty][
                    this.props.selectedMode
                  ]
                }
              </ScoresTable>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stats: state.game.stats,
    loading: state.ui.gameStats.loading,
    selectedMode: state.ui.gameStats.selectedMode,
    selectedDifficulty: state.ui.gameStats.selectedDifficulty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStats: () => {
      dispatch(getGameStats());
    },
    selectMode: mode => {
      dispatch(selectMode(mode));
    },
    selectDifficulty: diff => {
      dispatch(selectDifficulty(diff));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard);
