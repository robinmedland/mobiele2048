import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlayerFormReducer from './PlayerFormReducer';

export default combineReducers({
  auth: AuthReducer,
  playerForm: PlayerFormReducer
});
