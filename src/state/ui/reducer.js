import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import newGameReducer from './new-game/reducer';
import registerReducer from './register/reducer';
import logoutModalReducer from './logout-modal/reducer';
import gameStatsReducer from './game-stats/reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    newGame: newGameReducer,
    logoutModal: logoutModalReducer,
    gameStats: gameStatsReducer
});

export default reducers;
