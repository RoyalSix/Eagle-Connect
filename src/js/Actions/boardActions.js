import * as types from './actionTypes';
import * as API from '../API'
import firebase from '../modules/firebase'
var database = firebase.database();
const TWELVE_HOURS = 4.32e+7

export function postMesssageToBoad(message, username) {
    return (dispatch) => {
        debugger;
        API.postMessage(message, username, (snapshotKey) => {
            debugger;
            if (snapshotKey) setTimeout(() => {
                database.ref(`boardMessages/${snapshotKey}`).remove();
            }, TWELVE_HOURS)
        });
    }
}

export function getBoardMessages() {
    return (dispatch) => {
        return API.getBoardMessages((messages) => {
            dispatch({
                type: types.GET_BOARD_MESSAGES,
                messages
            })
        })
    }
}

export function getMessageBoardVisibility() {
    return ((dispatch) => {
        API.getMessageBoardVisibility((visibility) => {
             dispatch({
                type: types.GET_BOARD_VISIBILITY,
                visibility
            })
        })
    })
}