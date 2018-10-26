import { combineReducers } from 'redux';
import uiReducer from './ui/reducer';
import userReducer from './user/reducer';
import gameReducer from './game/reducer';
import timerReducer from './timer/reducer';

const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    game: gameReducer,
    timer: timerReducer
});

export default reducers;
