import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as gameActions from "../../state/game/actions";

class NewGame extends Component {
  state = {
    option: "default",
    question_count: 0
  };

  onSelectHandler = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  onSubmitHandler = () => {
    this.props.startGame({
      difficulty: this.state.option,
      question_count: this.state.question_count
    });
    console.log(this.state);
  };

  render() {
    if (this.props.gotTheQuestions) {
      return <Redirect to="/jugar" />;
    }

    let canSubmit = this.state.option !== "default" && this.state.question_count > 0;
    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-8-tablet is-6-desktop">
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Dificultad</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <div className="select">
                    <select
                      name="option"
                      value={this.state.option}
                      onChange={this.onSelectHandler}
                      disabled={this.props.isLoading}>
                      <option value="default" disabled>
                        Elige una dificultad
                      </option>
                      <option value="easy">Fácil</option>
                      <option value="medium">Media</option>
                      <option value="hard">Difícil</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <div className="select">
                    <select
                      name="question_count"
                      value={this.state.question_count}
                      onChange={this.onSelectHandler}
                      disabled={this.props.isLoading}>
                      <option value="0" disabled>
                        Elige un modo de juego
                      </option>
                      <option value="10">Rápido (10 preguntas)</option>
                      <option value="25">Normal (25 preguntas)</option>
                      <option value="50">Extendido (50 preguntas)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={[
              "button",
              "is-link",
              this.props.isLoading ? "is-loading" : ""
            ].join(" ")}
            disabled={!canSubmit || this.props.isLoading}
            onClick={this.onSubmitHandler}>
            Comenzar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.newGame.loading,
    gotTheQuestions: state.game.questions.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: options => {
      dispatch(gameActions.startGame(options));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame);
