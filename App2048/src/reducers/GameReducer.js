import {
  SWIPE, CREATE_GAME
} from '../actions/types';

const INITIAL_STATE = {
  board: []
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SWIPE:
      return { ...state, board: [...action.payload] };
    case CREATE_GAME:
    return { ...state, board: [...action.payload]};
    default:
      return state;
  }
};