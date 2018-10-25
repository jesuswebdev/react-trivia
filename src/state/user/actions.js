import * as actionTypes from './actionTypes';
import * as uiLoginActions from '../ui/login/actions';
import axios from 'axios';

export const submitLogin = userData => dispatch => {
	dispatch(uiLoginActions.uiStartLogin());

    axios.post('http://localhost:8080/users/login', userData)
    .then(({data}) => {
        localStorage.setItem('userData', JSON.stringify(data));
        dispatch(loginSuccess(data));
        dispatch(uiLoginActions.uiFinishLogin());
    })
    .catch(({response: {data}}) => {
        dispatch(uiLoginActions.uiFailLogin(data));
    });
}

const loginSuccess = (user) => {
	return {
		type: actionTypes.USER_LOGIN_SUCCESS,
		user
	}
}