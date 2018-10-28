import * as gameActionTypes from './actionTypes';
import * as uiNewGameActions from '../ui/new-game/actions';
import * as uiGameStatsActions from '../ui/game-stats/actions';
import axios from 'axios';
import { API_URL } from '../../config';

export const startGame = (options) => dispatch => {

    dispatch(uiNewGameActions.uiNewGameStartLoadingQuestions());
    const {token} = JSON.parse(localStorage.getItem('userData'));

    axios({
        method: 'get',
        url: `${API_URL}/questions/newgame/${options.difficulty}?question_count=${options.question_count}`,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(({data}) => {
        dispatch(gameStartSuccess(data))
        dispatch(uiNewGameActions.uiNewGameFinishLoadingQuestions());
    })
    .catch(({response: {data}}) => {
        dispatch(uiNewGameActions.uiNewGameFailLoadingQuestions(data));
    });
}

export const saveGame = (game) => dispatch => {
    const {token} = JSON.parse(localStorage.getItem('userData'));
    axios({
        method: 'post',
        url: `${API_URL}/games`,
        data: game,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((response) => {
    })
    .catch(({response: {data}}) => {
        
    })
}

export const gameStartSuccess = (gameOptions) => {
    return {
        type: gameActionTypes.GAME_START_SUCCESS,
        payload: gameOptions
    }
}

export const destroyGame = () => {
    return {
        type: gameActionTypes.DESTROY_GAME
    }
}

export const startQuestion = () => {
    return {
        type: gameActionTypes.START_QUESTION
    }
}

export const timerTimedOut = () => {
    return {
        type: gameActionTypes.TIMER_TIMED_OUT
    }
}

export const selectWrongAnswer = (stats) => {
    return {
        type: gameActionTypes.SELECT_WRONG_ANSWER,
        payload: stats
    }
}

export const selectCorrectAnswer = (stats) => {
    return {
        type: gameActionTypes.SELECT_CORRECT_ANSWER,
        payload: stats
    }
}

export const setVictory = () => {
    return {
        type: gameActionTypes.SET_VICTORY
    }
}

export const nextQuestion = () => {
    return {
        type: gameActionTypes.NEXT_QUESTION
    }
}

const getGameStatsSuccess = (stats) => {
    return {
        type: gameActionTypes.GET_GAME_STATS_SUCCESS,
        payload: stats
    }
}

export const getGameStats = () => dispatch => {
    dispatch(uiGameStatsActions.startLoadingStats());

    axios({
        method: 'get',
        url: `${API_URL}/games/stats`,
    })
    .then(({data}) => {
        dispatch(getGameStatsSuccess(data));
        dispatch(uiGameStatsActions.finishLoadingStats());
    })
    .catch(({response: {data}}) => {
        dispatch(uiGameStatsActions.failLoadingStats(data));
    })
}
