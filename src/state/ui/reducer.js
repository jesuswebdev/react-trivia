import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import newGameReducer from './new-game/reducer';
import registerReducer from './register/reducer';
import logoutModalReducer from './logout-modal/reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    newGame: newGameReducer,
    logoutModal: logoutModalReducer
});

export default reducers;
