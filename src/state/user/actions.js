import * as actionTypes from './actionTypes';
import * as uiLoginActions from '../ui/login/actions';
import * as uiRegisterActions from '../ui/register/actions';
import axios from 'axios';
import { API_URL } from '../../config';

export const submitLogin = userData => dispatch => {
	dispatch(uiLoginActions.uiStartLogin());

    axios.post(`${API_URL}/users/login`, userData)
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
		payload: user
	}
}

export const logout = () => {
    localStorage.removeItem('userData');
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export const submitRegister = registerData => dispatch => {
    dispatch(uiRegisterActions.uiRegisterStart());

    axios({
        method: 'post',
        url: `${API_URL}/users/register`,
        data: registerData
    })
    .then(({data}) => {
        dispatch(registerSuccess(data));
        dispatch(uiRegisterActions.uiRegisterFinish());
    })
    .catch(({response: {data}}) => {
        dispatch(uiRegisterActions.uiRegisterFail(data));
    })
}

const registerSuccess = (registerData) => {
    return {
        type: actionTypes.USER_REGISTER_SUCCESS,
        payload: registerData
    }
}
