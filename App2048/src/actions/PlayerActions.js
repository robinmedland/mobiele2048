import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    PLAYER_UPDATE,
    PLAYER_CREATE,
    PLAYER_CREATE_SUCCES
    
} from './types';

export const playerUpdate = ({ prop, value }) => {
    return {
        type: PLAYER_UPDATE,
        payload: { prop, value }
    };
};

export const playerCreate = ({ name, highscore }) => {
    return (dispatch) => {
    dispatch({ type: PLAYER_CREATE });
    const { currentUser } = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/players`)
        .push({ name, highscore })
        .then(() => playerCreateSucces(dispatch));       
        };
};

const playerCreateSucces = (dispatch) => {
    dispatch({ type: PLAYER_CREATE_SUCCES });
    Actions.pop();
};

