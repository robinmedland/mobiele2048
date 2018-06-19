import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlayerFormReducer from './PlayerFormReducer';
import PlayerReducer from './PlayerReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  auth: AuthReducer,
  playerForm: PlayerFormReducer,
  players: PlayerReducer,
  game: GameReducer
});
