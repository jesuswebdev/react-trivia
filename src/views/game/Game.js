import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as gameActions from "../../state/game/actions";
import * as timerActions from "../../state/timer/actions";
import StartQuestion from "./start-question/StartQuestion";
import ShowQuestion from "./show-question/ShowQuestion";
import NextQuestion from "./next-question/NextQuestion";
import GameFinished from "./game-finished/GameFinished";
import { TIMER_TIME } from "../../config";

class Game extends Component {
  componentWillUnmount() {
    this.props.destroyGame();
  }
  componentDidMount() {
    this.props.resetTimer();
  }

  prepareGame = name => {
    const questions = this.props.questions.map(q => {
      return {
        question: q._id,
        answered: q.answered,
        selected_option: q.selected_option || 0,
        duration: q.duration,
        timed_out: q.timedOut
      };
    });

    return {
      questions,
      token: this.props.gameToken,
      name
    };
  };

  submitGame = name => {
    this.props.saveGame(this.prepareGame(name));
  };

  startQuestion = () => {
    const interval = setInterval(() => {
      this.props.timerTick();
    }, 1000);
    const timeout = setTimeout(() => {
      this.props.timerTimedOut();
      clearInterval(interval);
      this.submitGame(null);
    }, TIMER_TIME * 1000);
    this.props.setTimerIds(interval, timeout);
    this.props.startQuestion();
  };

  selectOptionHandler = async ({ target: { id } }) => {
    let options = this.props.questions[this.props.currentQuestion].options;
    let correct = options.find(o => o.option_id === parseInt(id, 10))
      .correct_answer;

    let stats = {
      position: this.props.currentQuestion,
      duration: TIMER_TIME - this.props.timerSeconds,
      option: id
    };

    if (!correct) {
      await this.props.selectWrongAnswer(stats);
    } else {
      await this.props.selectCorrectAnswer(stats);
    }
    if (this.props.currentQuestion + 1 === this.props.questions.length) {
      this.props.setVictory();
    }
    clearTimeout(this.props.timeoutId);
    clearInterval(this.props.intervalId);
    this.props.resetTimer();
  };

  onClickNextQuestion = () => {
    this.props.resetTimer();
    this.props.goToNextQuestion();
  };

  render() {
    if (!this.props.gameToken) {
      return <Redirect to="/nuevo" />;
    }
    if (!this.props.questionStarted) {
      return (
        <StartQuestion
          currentQuestion={this.props.currentQuestion + 1}
          questionCount={this.props.questions.length}
          category={
            this.props.questions[this.props.currentQuestion].category.title
          }
          startQuestion={this.startQuestion}
        />
      );
    }
    if (this.props.victory || this.props.timedOut) {
      return (
        <GameFinished
          submitHandler={this.submitGame}
          timedOut={this.props.timedOut}
          loading={this.props.savingGame}
          correctAnswers={this.props.totalCorrectAnswers}
          totalQuestions={this.props.questions.length}
          error={this.props.saveGameError}
          errorMessage={this.props.saveGameErrorMessage}
          gameSaved={this.props.gameSaved}
        />
      );
    }
    if (this.props.questionStarted && this.props.wrongAnswer) {
      const { text } = this.props.questions[
        this.props.currentQuestion
      ].options.find(o => o.correct_answer);
      return (
        <NextQuestion
          wrong
          goToNextQuestion={
            this.onClickNextQuestion
          }>{`La respuesta correcta era: ${text}`}</NextQuestion>
      );
    }
    if (this.props.questionStarted && this.props.correctAnswer) {
      return <NextQuestion goToNextQuestion={this.onClickNextQuestion} />;
    }

    return (
      <ShowQuestion
        currentQuestion={this.props.currentQuestion + 1}
        questionCount={this.props.questions.length}
        question={this.props.questions[this.props.currentQuestion]}
        selectOptionHandler={this.selectOptionHandler}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    gameToken: state.game.token,
    questionStarted: state.game.questionStarted,
    questions: state.game.questions,
    currentQuestion: state.game.currentQuestion,
    timedOut: state.game.timedOut,
    intervalId: state.timer.intervalId,
    timeoutId: state.timer.timeoutId,
    wrongAnswer: state.game.selectedWrongAnswer,
    correctAnswer: state.game.selectedCorrectAnswer,
    victory: state.game.victory,
    timerSeconds: state.timer.seconds,
    gameSaved: state.game.saved,
    savingGame: state.ui.game.loading,
    saveGameError: state.ui.game.error,
    saveGameErrorMessage: state.ui.game.errorMessage,
    totalCorrectAnswers: state.game.correct_answers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    destroyGame: () => {
      dispatch(gameActions.destroyGame());
    },
    startQuestion: () => {
      dispatch(gameActions.startQuestion());
    },
    setTimerIds: (interval, timeout) => {
      dispatch(timerActions.setTimerIds(interval, timeout));
    },
    timerTick: () => {
      dispatch(timerActions.tick());
    },
    timerTimedOut: () => {
      dispatch(gameActions.timerTimedOut());
    },
    selectWrongAnswer: stats => {
      dispatch(gameActions.selectWrongAnswer(stats));
    },
    selectCorrectAnswer: stats => {
      dispatch(gameActions.selectCorrectAnswer(stats));
    },
    setVictory: () => {
      dispatch(gameActions.setVictory());
    },
    goToNextQuestion: () => {
      dispatch(gameActions.nextQuestion());
    },
    resetTimer: () => {
      dispatch(timerActions.reset());
    },
    saveGame: game => {
      dispatch(gameActions.saveGame(game));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
