import * as gameActionTypes from "./actionTypes";
import { shuffleOptions } from "../../utils";

const initialState = {
  token: null,
  questions: [],
  currentQuestion: 0,
  timedOut: false,
  questionStarted: false,
  victory: false,
  stats: null,
  correct_answers: 0
};

const gameStartSuccess = (state, action) => {
  let questions = action.payload.questions.map(question => {
    return {
      ...question,
      answered: false,
      selected_option: null,
      duration: 0,
      timedOut: false,
      options: shuffleOptions(question.options)
    };
  });

  return {
    ...state,
    token: action.payload.game_token,
    questions
  };
};

const startQuestion = (state, action) => {
  return {
    ...state,
    questionStarted: true
  };
};

const timerTimedOut = (state, action) => {
  return {
    ...state,
    timedOut: true,
    questions: state.questions.map((q, i) => {
      if (i === state.currentQuestion) {
        return {
          ...q,
          timedOut: true,
          duration: 30
        };
      }
      return q;
    })
  };
};

const selectAnswer = (state, action) => {
  const questions = updateQuestion(state, action.payload.stats);
  const { correct } = action.payload;
  return {
    ...state,
    questions,
    correct_answers: correct ? state.correct_answers + 1 : state.correct_answers
  };
};

const setVictory = (state, action) => {
  return {
    ...state,
    victory: true
  };
};

const nextQuestion = (state, action) => {
  return {
    ...state,
    currentQuestion: state.currentQuestion + 1,
    timedOut: false,
    questionStarted: false,
    victory: false
  };
};

const updateQuestion = (state, payload) => {
  let [question] = state.questions.filter((_, i) => i === payload.position);
  question = {
    ...question,
    answered: true,
    duration: payload.duration,
    selected_option: parseInt(payload.option, 10)
  };

  return state.questions.map((q, i) => {
    return i !== payload.position ? q : question;
  });
};

const getGameStatsSuccess = (state, action) => {
  return {
    ...state,
    stats: action.payload
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case gameActionTypes.GAME_START_SUCCESS:
      return gameStartSuccess(state, action);
    case gameActionTypes.DESTROY_GAME:
      return initialState;
    case gameActionTypes.START_QUESTION:
      return startQuestion(state, action);
    case gameActionTypes.TIMER_TIMED_OUT:
      return timerTimedOut(state, action);
    case gameActionTypes.SELECT_ANSWER:
      return selectAnswer(state, action);
    case gameActionTypes.SET_VICTORY:
      return setVictory(state, action);
    case gameActionTypes.NEXT_QUESTION:
      return nextQuestion(state, action);
    case gameActionTypes.GET_GAME_STATS_SUCCESS:
      return getGameStatsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
