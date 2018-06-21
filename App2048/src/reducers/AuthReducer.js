import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER_SUCCES,
    LOGOUT_USER
  } from '../actions/types';
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EMAIL_CHANGED:
      return { ...state, error: INITIAL_STATE.error, email: action.payload };
      case PASSWORD_CHANGED:
      return { ...state, error: INITIAL_STATE.error, password: action.payload };
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, error: action.payload, password: '', loading: false };
      case LOGOUT_USER:
        console.log('LogOut REDUCER');
        return { ...state, loading: true };
      case LOGOUT_USER_SUCCES:
        console.log('LOGOUTSUCCES REDUCER');
        return { ...state, ...INITIAL_STATE };
        default:
        return state;
    }
  };
  
