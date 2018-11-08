import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Columns, Column, Typography, Box } from '../../components/UI';
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
    const {
      selectedDifficulty,
      selectedMode,
      stats,
      loading,
      hasError,
      errorMessage
    } = this.props;
    return (
      <Columns mobile tablet desktop centered>
        <Column mobile={10} tablet={10} desktop={10}>
          <Box>
            <Typography type="subtitle" size={5} centered>
              Tabla de Posiciones
            </Typography>
            <hr />
            { hasError && !loading && <div className="notification is-danger has-text-centered">{errorMessage}</div> }
            {loading && !hasError ? (
              <p className="has-text-centered">Cargando...</p>
            ) : (
              !loading && !hasError && (
                <Fragment>
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item has-text-centered">
                        <div className="field is-horizontal">
                          <div className="field-label is-normal">
                            <label
                              className="label"
                              style={{ minWidth: "100px" }}>
                              Dificultad
                            </label>
                          </div>
                          <div className="field-body">
                            <div className="field is-narrow">
                              <div className="control">
                                <div className="select is-fullwidth">
                                  <select
                                    value={selectedDifficulty}
                                    onChange={({ target: { value } }) =>
                                      this.props.selectDifficulty(value)
                                    }>
                                    <option value="easy">Fácil</option>
                                    <option value="medium">Media</option>
                                    <option value="hard">Difícil</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div className="field is-horizontal">
                          <div className="field-label is-normal">
                            <label
                              className="label"
                              style={{ minWidth: "140px" }}>
                              Modo de Juego
                            </label>
                          </div>
                          <div className="field-body">
                            <div className="field is-narrow">
                              <div className="control">
                                <div className="select is-fullwidth">
                                  <select
                                    value={selectedMode}
                                    onChange={({ target: { value } }) =>
                                      this.props.selectMode(value)
                                    }>
                                    <option value="fast">Rápido</option>
                                    <option value="normal">Normal</option>
                                    <option value="extended">Extendido</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {stats && (
                    <ScoresTable>
                      {stats[selectedDifficulty][selectedMode]}
                    </ScoresTable>
                  )}
                </Fragment>
              )
            )}
            <div className="has-text-centered">
              <Link to="/" className="button is-info">
                Volver al menú principal
              </Link>
            </div>
          </Box>
        </Column>
      </Columns>
    );
  }
}

const mapStateToProps = state => {
  return {
    stats: state.game.stats,
    loading: state.ui.gameStats.loading,
    selectedMode: state.ui.gameStats.selectedMode,
    selectedDifficulty: state.ui.gameStats.selectedDifficulty,
    hasError: state.ui.gameStats.error,
    errorMessage: state.ui.gameStats.errorMessage
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
