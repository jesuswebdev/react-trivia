import { combineReducers } from 'redux';
import newGameReducer from './new-game/reducer';
import gameStatsReducer from './game-stats/reducer';
import gameReducer from './game/reducer';
import contributeReducer from './contribute/reducer';

const reducers = combineReducers({
    newGame: newGameReducer,
    gameStats: gameStatsReducer,
    game: gameReducer,
    contribute: contributeReducer
});

export default reducers;
