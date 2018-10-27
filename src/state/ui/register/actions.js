import * as uiRegisterActionTypes from './actionTypes';

export const uiRegisterStart = () => {
    return {
        type: uiRegisterActionTypes.UI_START_REGISTER
    }
}

export const uiRegisterFinish = () => {
    return {
        type: uiRegisterActionTypes.UI_FINISH_REGISTER
    }
}

export const uiRegisterFail = (args) => {
    return {
        type: uiRegisterActionTypes.UI_FAIL_REGISTER,
        payload: args
    }
}

export const uiResetRegistered = () => {
    return {
        type: uiRegisterActionTypes.UI_RESET_REGISTERED
    }
}
