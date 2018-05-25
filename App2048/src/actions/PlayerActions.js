import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    PLAYER_UPDATE,
    PLAYER_CREATE
} from './types';

export const playerUpdate = ({ prop, value }) => {
    return {
        type: PLAYER_UPDATE,
        payload: { prop, value }
    };
};

export const playerCreate = ({ name }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/players`)
        .push({ name })
        .then(() => {
            dispatch({ type: PLAYER_CREATE });
            Actions.pop()
        });
    };
};
