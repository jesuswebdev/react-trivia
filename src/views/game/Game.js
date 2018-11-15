import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as gameActions from "../../state/game/actions";
import * as timerActions from "../../state/timer/actions";
import StartQuestion from "./start-question/StartQuestion";
import ShowQuestion from "./show-question/ShowQuestion";
import GameFinished from "./game-finished/GameFinished";
import { TIMER_TIME } from "../../config";
import { http } from "../../utils";

class Game extends Component {
  state = {
    answered: false,
    correctAnswer: false,
    selectedOption: null,
    saving: false,
    saved: false,
    error: false
  };

  setAnswered = answered => this.setState({ answered });
  setSelectedOption = selectedOption => this.setState({ selectedOption });
  setCorrectAnswer = correctAnswer => this.setState({ correctAnswer });

  resetQuestion = () => {
    this.setAnswered(false);
    this.setSelectedOption(null);
    this.setCorrectAnswer(false);
  };
  componentWillUnmount() {
    this.props.destroyGame();
  }
  componentDidMount() {
    this.props.resetTimer();
  }

  saveGame = game => {
    this.setState({ saving: true, saved: false, error: false }, async () => {
      try {
        await http.post("/games", game);
        this.setState({ saving: false, saved: true });
      } catch (error) {
        this.setState({ saving: false, error: true });
      }
    });
  };

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
    this.saveGame(this.prepareGame(name));
  };

  startQuestion = () => {
    const interval = setInterval(() => {
      this.props.timerTick();
    }, 1000);
    const timeout = setTimeout(() => {
      this.props.timerTimedOut();
      clearInterval(interval);
    }, TIMER_TIME * 1000);
    this.props.setTimerIds(interval, timeout);
    this.props.startQuestion();
  };

  selectOptionHandler = async ({ target: { id } }) => {
    let options = this.props.questions[this.props.currentQuestion].options;
    let correct = options.find(o => o.option_id === parseInt(id, 10))
      .correct_answer;

    this.setAnswered(true);
    this.setCorrectAnswer(correct);
    this.setSelectedOption(parseInt(id, 10));

    let stats = {
      position: this.props.currentQuestion,
      duration: TIMER_TIME - this.props.timerSeconds,
      option: id
    };

    this.props.selectAnswer(stats, correct);
    clearTimeout(this.props.timeoutId);
    clearInterval(this.props.intervalId);
    this.props.resetTimer();
  };

  onClickNextQuestion = () => {
    this.props.resetTimer();
    this.resetQuestion();
    if (this.props.currentQuestion + 1 === this.props.questions.length) {
      this.props.setVictory();
      return;
    }
    if (this.props.currentQuestion < this.props.questions.length) {
      this.props.goToNextQuestion();
    }
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
      const { saving, saved, error } = this.state;
      return (
        <GameFinished
          submitHandler={this.submitGame}
          timedOut={this.props.timedOut}
          loading={saving}
          correctAnswers={this.props.totalCorrectAnswers}
          totalQuestions={this.props.questions.length}
          error={error}
          gameSaved={saved}
        />
      );
    }

    return (
      <ShowQuestion
        currentQuestion={this.props.currentQuestion + 1}
        questionCount={this.props.questions.length}
        question={this.props.questions[this.props.currentQuestion]}
        selectOptionHandler={this.selectOptionHandler}
        answered={this.state.answered}
        correct={this.state.correctAnswer}
        selectedOption={this.state.selectedOption}
        reset={this.onClickNextQuestion}
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
    victory: state.game.victory,
    timerSeconds: state.timer.seconds,
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
    selectAnswer: (stats, correct) => {
      dispatch(gameActions.selectAnswer(stats, correct));
    },
    setVictory: () => {
      dispatch(gameActions.setVictory());
    },
    goToNextQuestion: () => {
      dispatch(gameActions.nextQuestion());
    },
    resetTimer: () => {
      dispatch(timerActions.reset());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
