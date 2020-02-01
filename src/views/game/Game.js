import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import StartQuestion from "./StartQuestion";
import ShowQuestion from "./ShowQuestion";
import GameFinished from "./GameFinished";
import { TIMER_TIME } from "../../config";
import { http } from "../../utils";
import { message } from "antd";

const Game = props => {
  const [gameState, setGameState] = useState(null);
  const [questionStage, setQuestionStage] = useState("start-question"); //start-question, started, answered
  const [validatingAnswer, setValidatingAnswer] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [questionStart, setQuestionStart] = useState(0);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [redirectOnError, setRedirectOnError] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [error, setError] = useState(false);
  const [retryProperties, setRetryProperties] = useState(undefined);

  const loadQuestion = async state => {
    try {
      setLoadingQuestion(true);
      const { data } = await http.get(
        `/games/${state.game.id}/next-question?token=${state.token}`
      );
      setGameState(data);
    } catch (error) {
      console.error(error);
      setRedirectOnError(true);
    } finally {
      setLoadingQuestion(false);
    }
  };

  useEffect(() => {
    loadQuestion(props.location.state);
    props.history.replace();
  }, []);

  useEffect(
    () => {
      if (questionStage === "started") {
        setQuestionStart(new Date().getTime());
      }
      if (questionStage === "start-question") {
        setQuestionStart(0);
      }
    },
    [questionStage]
  );

  const retryHandler = async () => {
    return await selectOptionHandler(
      retryProperties.question.selected_option,
      retryProperties
    );
  };

  const selectOptionHandler = async (id, options, _timedOut) => {
    const isTimedOut = !!timedOut || !!_timedOut;
    if (!isTimedOut) {
      setAnswered(true);
    }
    setValidatingAnswer(true);
    const loadingMessage = message.loading(
      isTimedOut ? "Actualizando el juego" : "Validando tu respuesta",
      0
    );
    const answerProperties = {
      token: gameState.token,
      question: {
        id: gameState.question.id,
        ...(!isTimedOut && { selected_option: id }),
        answered: !isTimedOut,
        duration: isTimedOut
          ? TIMER_TIME * 1000
          : new Date().getTime() - questionStart,
        timed_out: isTimedOut,
        answered_at: new Date().getTime()
      }
    };
    try {
      const { data } = await http.post(
        `/games/${gameState.game.id}/answer`,
        options || answerProperties
      );
      setGameState({ ...gameState, ...data });
      setError(false);
    } catch (error) {
      console.error(error);
      if ((error || {}).message === "Network Error") {
        setError("network_error");
        setRetryProperties(answerProperties);
      }
    } finally {
      setValidatingAnswer(false);
      loadingMessage();
    }
  };

  const resetState = () => {
    setValidatingAnswer(false);
    setTimedOut(false);
    setAnswered(false);
    setQuestionStart(0);
  };

  const onClickNextQuestion = () => {
    if (!gameState.game.remaining_attempts) {
      return setGameFinished(true);
    }
    setQuestionStage("start-question");
    loadQuestion(gameState);
    resetState();
  };

  const onTimedOut = async () => {
    setTimedOut(true);
    selectOptionHandler(null, null, true);
  };
  const startQuestion = () => {
    setQuestionStage("started");
  };
  if (redirectOnError) {
    return <Redirect to="/" />;
  }

  if (gameFinished) {
    return <GameFinished game={gameState.game} />;
  }

  if (questionStage === "start-question") {
    return (
      <StartQuestion
        question={(gameState || {}).question}
        start={startQuestion}
        loading={loadingQuestion}
      />
    );
  }
  if (questionStage === "started") {
    return (
      <ShowQuestion
        question={gameState.question}
        selectOptionHandler={selectOptionHandler}
        onTimedOut={onTimedOut}
        validatingAnswer={validatingAnswer}
        timedOut={timedOut}
        answered={answered}
        remainingAttempts={gameState.game.remaining_attempts}
        response={gameState.answer}
        nextQuestion={onClickNextQuestion}
        error={error}
        retry={retryHandler}
      />
    );
  }
};

export default Game;
