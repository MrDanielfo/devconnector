import axios from 'axios';
import { setAlert } from './alert';

import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';

import setAuthToken from '../utils/setAuthToken';


export const loadUser = () => async dispatch => {

    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {

        const url = '/api/auth';
        const res = await axios.get(url);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

        

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}

// register User

export const registerUser = ({name, email, password}) => async dispatch => {

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password });

    try {

        const url = '/api/users';

        const res = await axios.post(url, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
  
    } catch (err) {

        const errors = err.response.data.errors 
        
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')) );
        }

        dispatch({
            type: REGISTER_FAIL
        });

    }

}

// login User

export const loginUser = ({email, password}) => async dispatch => {

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    try {

        const url = '/api/auth';

        const res = await axios.post(url, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
  
    } catch (err) {

        const errors = err.response.data.errors 
        
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')) );
        }

        dispatch({
            type: LOGIN_FAIL
        });

    }

}

export const logoutUser = () => dispatch => {

    dispatch({
      type: CLEAR_PROFILE
    });

    dispatch({
        type: LOGOUT
    });


}

