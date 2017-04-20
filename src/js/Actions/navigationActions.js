import * as types from './actionTypes';
export function changeTab (index) {
    return {
        type:types.CHANGE_TAB,
        currentTab:index
    }
}  