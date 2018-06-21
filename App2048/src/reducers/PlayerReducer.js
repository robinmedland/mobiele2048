import {
    PLAYER_FETCH_SUCCESS,
    PLAYERS_FETCH_SUCCES,
    PLAYER_DELETE_SUCCES
} from '../actions/types';

const INITIAL_STATE = {
    players: [],
    player: {name: 'DEfault Name', highscore: '999999'}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYERS_FETCH_SUCCES:
            return {...state, players: action.payload};
        case PLAYER_FETCH_SUCCESS:
            console.log(state);
            return {...state, player: action.payload};
        case PLAYER_DELETE_SUCCES:
            return {...state};
        default: 
            return state;   
    }
};