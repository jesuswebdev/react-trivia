import * as timerActionTypes from "./actionTypes";
import { TIMER_TIME } from '../../config';

const initialState = {
  seconds: TIMER_TIME,
  intervalId: null,
  timeoutId: null
};

const tick = (state, action) => {
    return {
        ...state,
        seconds: state.seconds - 1
      };
}

const setIds = (state, action) => {
    return {
        ...state,
        intervalId: action.payload.interval,
        timeoutId: action.payload.timeout
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case timerActionTypes.TIMER_TICK: return tick(state, action);
    case timerActionTypes.TIMER_RESET: return initialState;
    case timerActionTypes.SET_TIMER_IDS: return setIds(state, action);
    default:
      return state;
  }
};

export default reducer;
