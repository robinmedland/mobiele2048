import {
  SWIPE, CREATE_GAME, SCORE
} from '../actions/types';

const INITIAL_STATE = {
  board: [],
  score: 4
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SWIPE:
      return { ...state, board: [...action.payload] };
    case SCORE:
      console.log(action.payload);
      return { ...state, score: action.payload};
    case CREATE_GAME:
    return { ...state, board: [...action.payload]};
    default:
      return state;
  }
};