import * as actionTypes from './actionTypes';

const initialState = {
    loading: false,
    error: false,
    errorMessage: '',
    selectedDifficulty: 'easy',
    selectedMode: 'fast'
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.START_LOADING_STATS: {
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: ''
            }
        }
        case actionTypes.FINISH_LOADING_STATS: {
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.FAIL_LOADING_STATS: {
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: (action.error || {}).message || 'Ocurrió un error'
            }
        }
        case actionTypes.SELECT_MODE: {
            return {
                ...state,
                selectedMode: action.payload
            }
        }
        case actionTypes.SELECT_DIFFICULTY: {
            return {
                ...state,
                selectedDifficulty: action.payload
            }
        }
        default: return state;
    }
}

export default reducer;
