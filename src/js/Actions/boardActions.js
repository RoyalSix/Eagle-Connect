import * as types from './actionTypes';
import * as API from '../API'

export function postMesssageToBoad (message ){
    return (dispatch) => {
        API.postMessage(message, (result)=>{
            //check success of post
        });
    }
}

export function getBoardMessages() {
    return (dispatch) => {
        return API.getBoardMessages((messages)=> {
            dispatch({
                type:types.GET_BOARD_MESSAGES,
                messages
            })
        })
    }
}