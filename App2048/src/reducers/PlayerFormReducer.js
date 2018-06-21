import {
    PLAYER_UPDATE,
    PLAYER_CREATE,
    PLAYER_CREATE_SUCCES,
    PLAYER_CREATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    loading: false,
    highscore: '0',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYER_UPDATE:
        return { ...state,error: INITIAL_STATE.error, [action.payload.prop]: action.payload.value };
        case PLAYER_CREATE:
            return { ...state, loading: true };
        case PLAYER_CREATE_SUCCES:
            return { ...state, ...INITIAL_STATE };
        case PLAYER_CREATE_FAIL:
        return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
};
