import * as types from './actionTypes';
import * as API from '../API'

export function setTime() {
    const currentTime = API.getTime();
    return {
        type:types.SET_TIME, 
        time:currentTime
    }
}