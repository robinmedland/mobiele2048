import {
  SWIPE, CREATE_GAME
} from '../actions/types';

const INITIAL_STATE = {
  board: [[8,0,0,4],[4,0,2,0],[4,2,2,0],[2,0,2,2]]
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SWIPE:
      return { ...state, board: [...action.payload] };
    case CREATE_GAME:
      return state;
    default:
      return state;
  }
};