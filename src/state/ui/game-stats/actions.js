import * as actionTypes from './actionTypes';

export const startLoadingStats = () => {
    return {
        type: actionTypes.START_LOADING_STATS
    }
}

export const finishLoadingStats = () => {
    return {
        type: actionTypes.FINISH_LOADING_STATS
    }
}

export const failLoadingStats = () => {
    return {
        type: actionTypes.FAIL_LOADING_STATS
    }
}

export const selectMode = (mode) => {
    return {
        type: actionTypes.SELECT_MODE,
        payload: mode
    }
}
export const selectDifficulty = (difficulty) => {
    return {
        type: actionTypes.SELECT_DIFFICULTY,
        payload: difficulty
    }
}
