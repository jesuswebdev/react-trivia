import { combineReducers } from "redux";
import gameReducer from "./game/reducer";
import timerReducer from "./timer/reducer";
import userReducer from "./user/reducer";

const reducers = combineReducers({
  game: gameReducer,
  timer: timerReducer,
  user: userReducer
});

export default reducers;
