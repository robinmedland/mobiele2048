import {
  SWIPE, CREATE_GAME, SCORE, ENDGAME
} from '../actions/types';

const INITIAL_STATE = {
  board: [],
  score: 4,
  gameOver: false
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SWIPE:
      return { ...state, board: [...action.payload] };
    case SCORE:
      console.log(action.payload);
      return { ...state, score: action.payload };
    case CREATE_GAME:
    return { ...state, score: INITIAL_STATE.score, board: [...action.payload]};
    case ENDGAME:
    console.log(action.payload);
    return { ...state, gameOver: action.payload }; 
    default:
      return state;
  }
};