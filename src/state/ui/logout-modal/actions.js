import * as actionTypes from './actionTypes';

export const openLogoutModal = () => {
    return {
        type: actionTypes.OPEN_LOGOUT_MODAL
    }
}

export const closeLogoutModal = () => {
    return {
        type: actionTypes.CLOSE_LOGOUT_MODAL
    }
}
