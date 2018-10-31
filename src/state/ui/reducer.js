import { combineReducers } from 'redux';
import newGameReducer from './new-game/reducer';
import gameStatsReducer from './game-stats/reducer';
import gameReducer from './game/reducer';
import homeReducer from './home/reducer';

const reducers = combineReducers({
    newGame: newGameReducer,
    gameStats: gameStatsReducer,
    game: gameReducer,
    home: homeReducer
});

export default reducers;
