import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    PLAYER_UPDATE,
    PLAYER_CREATE,
    PLAYER_CREATE_SUCCES,
    PLAYERS_FETCH_SUCCES,
    PLAYER_CREATE_FAIL,
    PLAYER_FETCH_SUCCESS,
    PLAYER_DELETE_SUCCES
} from './types';

export const setHighscore = (uid, score) => {
    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/players/${uid}`).update({
            highscore: score
        }).then(() => playerUpdate('highscore', score))
    }
};

export const playerUpdate = ({ prop, value }) => {
    return {
        type: PLAYER_UPDATE,
        payload: { prop, value }
    };
};

export const playerCreate = ({ name, highscore }) => {
    if (!name) {
        return (dispatch) => {
            playerCreateFail(dispatch, 'Fill in name!')
        }}
    if (name.length > 20) {
        return (dispatch) => {
            playerCreateFail(dispatch, 'Max length is 20')
    }}
    let reg = /^[a-zA-Z]*$/;
    if(reg.test(name)===false) {
        return (dispatch) => {
            playerCreateFail(dispatch, 'Only use letters!')
    }}

    return (dispatch) => {
    dispatch({ type: PLAYER_CREATE });
    const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/players`)
        .push({ name, highscore })
        .then(() => playerCreateSucces(dispatch));

    }

};

const playerCreateSucces = (dispatch) => {
    dispatch({ type: PLAYER_CREATE_SUCCES });
    Actions.pop();
};
const playerCreateFail = (dispatch, message ) => {
    dispatch({ type: PLAYER_CREATE_FAIL, payload: message });
};

export const playersFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/players`)
        .on('value', snapshot => {
            dispatch({ type: PLAYERS_FETCH_SUCCES, payload: snapshot.val() });
        });
    };
};

export const playerFetch = (uid) => {
    const { currentUser } = firebase.auth();
    console.log(uid);
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/players/${uid}`)
            .on('value', snapshot => {
                console.log(snapshot);
                dispatch({ type: PLAYER_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const playerDelete = ( uid ) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/players/${uid}`)
        .remove()
        .then(() => {
            dispatch({ type: PLAYER_DELETE_SUCCES });
        });
    };
};
