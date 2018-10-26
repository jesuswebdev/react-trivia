import * as uiNewGameActionTypes from './actionTypes';

const initialState = {
    loading: false,
    error: false,
    errorMessage: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case uiNewGameActionTypes.UI_START_LOADING_QUESTIONS: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: ''
            }
        }
        case uiNewGameActionTypes.UI_FINISH_LOADING_QUESTIONS: {
            return {
                ...state,
                loading: false
            }
        }

        case uiNewGameActionTypes.UI_FAIL_LOADING_QUESTIONS: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload.message
            }
        }
        default: return state;
    }
}

export default reducer;
