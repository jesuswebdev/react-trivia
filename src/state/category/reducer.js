import * as actionTypes from './actionTypes';

const initialState = {
	categories: []
}

const loadCategoriesSuccess = (state, action) => {
	return {
		...state,
		categories: action.payload.categories
	};
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.LOAD_CATEGORIES_SUCCESS: return loadCategoriesSuccess(state, action);
		default: return state;
	}
}

export default reducer;