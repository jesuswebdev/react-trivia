import * as actionTypes from './actionTypes';

const initialState = {
	loading: false,
	error: false,
	errorMessage: ''
};

const startLogin = (state, action) => {
	return {
		...state,
		loading: true,
		error: false,
		errorMessage: ''
	};
}

const finishLogin = (state, action) => {
	return {
		...state,
		loading: false
	}
}

const failLogin = (state, action) => {
	return {
		...state,
		loading: false,
		error: true,
		errorMessage: action.payload.message
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UI_START_LOGIN: return startLogin(state, action);
		case actionTypes.UI_FINISH_LOGIN: return finishLogin(state, action);
		case actionTypes.UI_FAIL_LOGIN: return failLogin(state, action);
		default: return state;
	}
};

export default reducer;

