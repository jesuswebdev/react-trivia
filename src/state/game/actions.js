import * as gameActionTypes from "./actionTypes";

export const gameStartSuccess = gameOptions => {
  return {
    type: gameActionTypes.GAME_START_SUCCESS,
    payload: gameOptions
  };
};

export const destroyGame = () => {
  return {
    type: gameActionTypes.DESTROY_GAME
  };
};

export const startQuestion = () => {
  return {
    type: gameActionTypes.START_QUESTION
  };
};

export const timerTimedOut = () => {
  return {
    type: gameActionTypes.TIMER_TIMED_OUT
  };
};

export const selectAnswer = (stats, correct) => {
  return {
    type: gameActionTypes.SELECT_ANSWER,
    payload: { stats, correct }
  };
};

export const setVictory = () => {
  return {
    type: gameActionTypes.SET_VICTORY
  };
};

export const nextQuestion = () => {
  return {
    type: gameActionTypes.NEXT_QUESTION
  };
};
