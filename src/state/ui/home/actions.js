import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../../config';

export const startPingServer = () => {
	return {
		type: actionTypes.START_PING_SERVER
	}
}

export const finishPingServer = () => {
	return {
		type: actionTypes.FINISH_PING_SERVER
	}
}

export const errorPingServer = () => {
	return {
		type: actionTypes.ERROR_PING_SERVER
	}
}

export const pingServer = () => dispatch => {
	dispatch(startPingServer());
	axios({
		method: 'get',
		url: `${API_URL}/health`
	})
	.then(({data}) => {
		console.log(data);
		dispatch(finishPingServer());
	})
	.catch(({response: {data} = {}}) => {
		console.log(data);
		dispatch(errorPingServer(data));
	})
}