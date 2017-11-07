import axios from 'axios';
import {browserHistory} from 'react-router';

import {AUTH_USER, UNAUTH_USER, AUTH_ERROR ,FETCH_MESSAGE} from './types';

const ROOT_URL = 'http://localhost:3001';

export const authError = err => {
	return {
		type: AUTH_ERROR,
		payload: err
	};
}

export const signinUser = ({email, password}) => dispatch => {
	//submit email and password to the server
	axios.post(`${ROOT_URL}/signin`, {email, password})
	.then(res => {
		dispatch({type: AUTH_USER});
		localStorage.setItem('token', res.data.token);
		browserHistory.push('/feature');
	})
	.catch(err => dispatch(authError('Bad Login Info')));
}

export const signoutUser = () => {
	localStorage.removeItem('token');
	return {type: UNAUTH_USER};
}

export const signupUser = ({email, password}) => dispatch => {
	axios.post(`${ROOT_URL}/signup`, {email, password})
	.then(res => {
		dispatch({type: AUTH_USER});
		localStorage.setItem('token', res.data.token);
		browserHistory.push('/feature');
	})
	.catch(err => dispatch(authError(err.response.data.err)));
}

export const fetchMessage = () => dispatch => {
	axios.get(ROOT_URL, {
		headers: {authorization: localStorage.getItem('token')}
	})
	.then(res => dispatch({type: FETCH_MESSAGE, payload: res.data.message}));
}