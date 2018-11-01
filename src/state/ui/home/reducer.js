import * as actionTypes from './actionTypes';

const initialState = {
	loading: false,
	error: false,
	success: null,
	status: ''
};

const startPingServer = (state, action) => {
	return {
		...state,
		loading: true,
		error: false,
		status: 'Consultando...',
		success: null
	}
};

const finishPingServer = (state, action) => {
	return {
		...state,
		loading: false,
		status: 'OK',
		success: true
	}
};

const errorPingServer = (state, action) => {
	return {
		...state,
		loading: false,
		error: true,
		status: 'ERROR'
	}
};


const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.START_PING_SERVER: return startPingServer(state, action);
		case actionTypes.FINISH_PING_SERVER: return finishPingServer(state, action);
		case actionTypes.ERROR_PING_SERVER: return errorPingServer(state, action);
		default: return state;
	}
}

export default reducer;