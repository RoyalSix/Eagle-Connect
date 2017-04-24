import * as types from './actionTypes';
import * as API from '../API'

export function changeTab (index) {
    return {
        type:types.CHANGE_TAB,
        currentTab:index
    }
}

export function setTime() {
    const currentTime = API.getTime();
    return {
        type:types.SET_TIME, 
        time:currentTime
    }
}

export function setDay() {
    const currentDay = API.getDay();
    return {
        type:types.SET_DAY, 
        day:currentDay
    }
}