import { combineReducers } from "redux";
import gameReducer from "./game/reducer";
import timerReducer from "./timer/reducer";

const reducers = combineReducers({
  game: gameReducer,
  timer: timerReducer
});

export default reducers;
