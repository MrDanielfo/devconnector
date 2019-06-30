import { REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch(type) {

        case USER_LOADED :
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;

    }

}