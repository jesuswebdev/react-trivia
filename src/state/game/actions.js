import * as gameActionTypes from "./actionTypes";
import * as uiGameStatsActions from "../ui/game-stats/actions";
import * as uiGameActions from "../ui/game/actions";
import axios from "axios";
import { API_URL } from "../../config";

export const saveGame = game => dispatch => {
  if (!game.name) {
    game = {
      token: game.token,
      questions: game.questions
    };
  }
  dispatch(uiGameActions.uiStartSavingGame());
  axios({
    method: "post",
    url: `${API_URL}/games`,
    data: game
  })
    .then(response => {
      if (game.name) {
        dispatch(gameSaved());
      }
      dispatch(uiGameActions.uiFinishSavingGame());
    })
    .catch(({ response: { data } }) => {
      dispatch(uiGameActions.uiErrorSavingGame(data));
    });
};

export const gameSaved = () => {
  return {
    type: gameActionTypes.GAME_SAVED
  };
};

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

export const selectWrongAnswer = stats => {
  return {
    type: gameActionTypes.SELECT_WRONG_ANSWER,
    payload: stats
  };
};

export const selectCorrectAnswer = stats => {
  return {
    type: gameActionTypes.SELECT_CORRECT_ANSWER,
    payload: stats
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

export const getGameStatsSuccess = stats => {
  return {
    type: gameActionTypes.GET_GAME_STATS_SUCCESS,
    payload: stats
  };
};

export const getGameStats = () => dispatch => {
  dispatch(uiGameStatsActions.startLoadingStats());

  axios({
    method: "get",
    url: `${API_URL}/games/top`
  })
    .then(({ data }) => {
      dispatch(getGameStatsSuccess(data));
      dispatch(uiGameStatsActions.finishLoadingStats());
    })
    .catch(({ response: { data } = {} }) => {
      dispatch(uiGameStatsActions.failLoadingStats(data));
    });
};
