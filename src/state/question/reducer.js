import * as actionTypes from './actionTypes';

const initialState = {
	sent: false
};

const submitQuestionSuccess = (state, action) => {
	return {
		...state,
		sent: true
	}
};

const resetSubmitQuestionState = (state, action) => {
	return {
		...state,
		sent: false
	}
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.SUBMIT_QUESTION_SUCCESS: return submitQuestionSuccess(state, action);
		case actionTypes.RESET_SUBMIT_QUESTION_STATE: return resetSubmitQuestionState(state, action);
		default: return state;
	}
}

export default reducer;