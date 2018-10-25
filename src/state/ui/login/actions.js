import * as actionTypes from './actionTypes';

export const uiStartLogin = () => {
	return {
		type: actionTypes.UI_START_LOGIN
	}
}

export const uiFinishLogin = () => {
	return {
		type: actionTypes.UI_FINISH_LOGIN
	}
}

export const uiFailLogin = (error) => {
	return {
		type: actionTypes.UI_FAIL_LOGIN,
		payload: error
	}
}