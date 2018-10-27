import * as actionTypes from './actionTypes';

const initialState = {
    open: false
}

const openModal = (state, action) => {
    return {
        open: true
    }
}

const closeModal = (state, action) => {
    return {
        open: false
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.OPEN_LOGOUT_MODAL: return openModal(state, action);
        case actionTypes.CLOSE_LOGOUT_MODAL: return closeModal(state, action);
        default: return state;
    }
}

export default reducer;
