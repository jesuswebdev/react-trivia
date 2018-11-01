import { combineReducers } from 'redux';
import uiReducer from './ui/reducer';
import gameReducer from './game/reducer';
import timerReducer from './timer/reducer';
import categoryReducer from './category/reducer';
import questionReducer from './question/reducer';

const reducers = combineReducers({
    ui: uiReducer,
    game: gameReducer,
    timer: timerReducer,
    category: categoryReducer,
    question: questionReducer
});

export default reducers;
