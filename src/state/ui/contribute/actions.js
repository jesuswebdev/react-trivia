import * as actionTypes from './actionTypes';

export const startLoadingCategories = () => {
	return {
		type: actionTypes.UI_START_LOADING_CATEGORIES
	}
}

export const finishLoadingCategories = () => {
	return {
		type: actionTypes.UI_FINISH_LOADING_CATEGORIES
	}
}

export const errorLoadingCategories = (error) => {
	return {
		type: actionTypes.UI_ERROR_LOADING_CATEGORIES,
		error: error
	}
}

export const startSubmittingQuestion = () => {
	return {
		type: actionTypes.UI_START_SUBMITTING_QUESTION
	}
}

export const finishSubmittingQuestion = () => {
	return {
		type: actionTypes.UI_FINISH_SUBMITTING_QUESTION
	}
}

export const errorSubmittingQuestion = (error) => {
	return {
		type: actionTypes.UI_ERROR_SUBMITTING_QUESTION,
		error: error
	}
}