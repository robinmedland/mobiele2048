import {
    PLAYER_UPDATE,
    PLAYER_CREATE,
    PLAYER_CREATE_SUCCES
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    loading: false,
    highscore: '0'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYER_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case PLAYER_CREATE:
            return { ...state, loading: true };
        case PLAYER_CREATE_SUCCES:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
