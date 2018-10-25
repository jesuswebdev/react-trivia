import { combineReducers } from 'redux';
import uiReducer from './ui/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer
});

export default reducers;
