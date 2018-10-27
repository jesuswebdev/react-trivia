import * as uiRegisterActionTypes from './actionTypes';

const initialState = {
    loading: false,
    error: false,
    errorMessage: '',
    registered: false
};

const startRegister = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

const finishRegister = (state, action) => {
    return {
        ...state,
        loading: false,
        registered: true
    }
}

const failRegister = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
    }
}

const resetRegistered = (state, action) => {
    return {
        ...state,
        registered: false
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case uiRegisterActionTypes.UI_START_REGISTER: return startRegister(state, action);
        case uiRegisterActionTypes.UI_FINISH_REGISTER: return finishRegister(state, action);
        case uiRegisterActionTypes.UI_FAIL_REGISTER: return failRegister(state, action);
        case uiRegisterActionTypes.UI_RESET_REGISTERED: return resetRegistered(state, action);
        default: return state;
    }
}

export default reducer;
