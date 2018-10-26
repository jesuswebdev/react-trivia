import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import newGameReducer from './new-game/reducer';

const reducers = combineReducers({
    login: loginReducer,
    newGame: newGameReducer
});

export default reducers;
