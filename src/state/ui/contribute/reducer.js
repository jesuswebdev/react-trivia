import * as actionTypes from './actionTypes';

const initialState = {
	loadingCategories: false,
	errorLoadingCategories: false,
	errorMessageLoadingCategories: '',
	loading: false,
	error: false,
	errorMessage: ''
};

const startLoadingCategories = (state, action) => {
	return {
		...state,
		loadingCategories: true,
		errorLoadingCategories: false,
		errorMessageLoadingCategories: ''
	};
}

const finishLoadingCategories = (state, action) => {
	return {
		...state,
		loadingCategories: false
	};
}

const errorLoadingCategories = (state, action) => {
	return {
		...state,
		loadingCategories: false,
		errorLoadingCategories: true,
		errorMessageLoadingCategories: (action.error || {}).message || 'Ocurrió un error cargando las categorías'
	};
}

const startSubmittingQuestion = (state, action) => {
	return {
		...state,
		loading: true,
		error: false,
		errorMessage: ''
	};
}

const finishSubmittingQuestion = (state, action) => {
	return {
		...state,
		loading: false
	};
}

const errorSubmittingQuestion = (state, action) => {
	return {
		...state,
		loading: false,
		error: true,
		errorMessage: action.error.message
	};
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.UI_START_LOADING_CATEGORIES: return startLoadingCategories(state, action);
		case actionTypes.UI_FINISH_LOADING_CATEGORIES: return finishLoadingCategories(state, action);
		case actionTypes.UI_ERROR_LOADING_CATEGORIES: return errorLoadingCategories(state, action);
		case actionTypes.UI_START_SUBMITTING_QUESTION: return startSubmittingQuestion(state, action);
		case actionTypes.UI_FINISH_SUBMITTING_QUESTION: return finishSubmittingQuestion(state, action);
		case actionTypes.UI_ERROR_SUBMITTING_QUESTION: return errorSubmittingQuestion(state, action);
		default: return state;
	}
}

export default reducer;
