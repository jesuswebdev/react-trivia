import * as actionTypes from './actionTypes';

const initialState = {
	loading: false,
	error: false,
	errorMessage: ''
};

const startSavingGame = (state, action) => {
	return {
				...state,
				loading: true,
				error: false,
				errorMessage: ''
			};
}

const finishSavingGame = (state, action) => {
	return {
				...state,
				loading: false
			};
}

const errorSavingGame = (state, action) => {
	return {
				loading: false,
				error: true,
				errorMessage: action.payload.message
			};
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.UI_START_SAVING_GAME: return startSavingGame(state, action);
		case actionTypes.UI_FINISH_SAVING_GAME: return finishSavingGame(state, action);
		case actionTypes.UI_ERROR_SAVING_GAME: return errorSavingGame(state, action);
		default: return state;
	}
}

export default reducer;