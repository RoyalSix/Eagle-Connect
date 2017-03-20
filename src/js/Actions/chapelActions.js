import * as types from './actionTypes';

export function startChapelLoad(mounted) {
    return {
        type:types.START_CHAPEL_LOAD,
        loadingChapels:true
    }
}

export function recieveChapel(mounted) {
    return {
        type:types.RECIEVE_CHAPEL_LOAD,
        loadingChapels:true
    }
}