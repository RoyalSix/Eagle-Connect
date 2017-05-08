import * as types from './actionTypes';
import * as API from '../API'
import { GraphRequest, GraphRequestManager, LoginManager, AccessToken } from 'react-native-fbsdk';


export function getFBUsername() {
    return (dispatch) => {
        const infoRequest = new GraphRequest(
            '/me',
            null,
            (error, result) => {
                if (!error) {
                    dispatch(receieveFBUsername(result.name))
                }
            }
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    }
}

export function receieveFBUsername(name) {
    return {
        type: types.RECEIVE_FB_USERNAME,
        name
    }
}

export function loginFB() {
    return (dispatch) => {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                if (data && data.accessToken) dispatch(getFBUsername())
                else {
                    LoginManager.logInWithReadPermissions(['public_profile']).then(
                        function (result) {
                            if (result.isCancelled) {
                            } else {
                                dispatch(getFBUsername())
                            }
                        },
                        function (error) {
                        }
                    )
                }
            }
        )
    }
}