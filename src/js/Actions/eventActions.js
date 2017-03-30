
import * as types from './actionTypes';
//Using constants instead of strings to differentiate types of actions
import { DOMParser } from 'react-native-html-parser';
//This is an external library used to parse html. React native does not 
//support this natively

//Creating action that will start the load
export function startEventLoad() {
    return function (dispatch) {

    }
}

// //Creating action that will send the events to the store
// export function receiveEventLoad() {
//     return {

//     }
// }

//Creating action that will get HTML data
export function getEvents() {

}