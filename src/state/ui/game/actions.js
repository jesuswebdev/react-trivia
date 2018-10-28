import * as actionTypes from './actionTypes';

export const uiStartSavingGame = () => {
	return {
		type: actionTypes.UI_START_SAVING_GAME
	}
}

export const uiFinishSavingGame = () => {
	return {
		type: actionTypes.UI_FINISH_SAVING_GAME
	}
}

export const uiErrorSavingGame = (error) => {
	return {
		type: actionTypes.UI_ERROR_SAVING_GAME,
		payload: error
	}
}