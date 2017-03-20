import * as types from './actionTypes';
import { DOMParser } from 'react-native-html-parser';
import HTMLParser from 'fast-html-parser';

export function startChapelLoad() {
    return function (dispatch) {
        dispatch({
            type: types.START_CHAPEL_LOAD,
            loadingChapels: true
        })
        return getChapels((chapels) => {
            dispatch(recieveChapels(chapels))
        })
    }
}

export function recieveChapels(chapels) {
    return {
        type: types.RECIEVE_CHAPEL_LOAD,
        loadingChapels: false,
        chapels: chapels
    }
}

export function getChapels(callback) {
    fetch('https://www.biola.edu/chapel').then((response) => response.blob()).then(function (myBlob) {
        var reader = new FileReader();
        reader.addEventListener("loadend", function (result) {
            var htmlString = result.srcElement.result;
            let doc = new DOMParser().parseFromString(htmlString, 'text/html');
            var chapelUnorderedList = doc.getElementsByClassName('chapel-list');
            var chapelList = [];
            for (var i = 0; i < chapelUnorderedList.length; i++) {
                var chapelListItems = chapelUnorderedList[i].querySelect('li');
                for (var j = 0; j < chapelListItems.length; j++) {
                    var chapelSplit = chapelListItems[j].childNodes;
                    var date = chapelSplit[0].textContent;
                    try {
                        var title = chapelSplit[1].querySelect('a')[0].textContent;
                        var speaker = chapelSplit[1].querySelect('.subtitle')[0].textContent;
                        var location = chapelSplit[1].querySelect('.location')[0].textContent;
                        chapelList.push({
                            date,
                            title,
                            speaker,
                            location
                        });
                    } catch (e) {
                    }
                }
            }
            callback(chapelList)
        });
        reader.readAsBinaryString(myBlob);
    });
} 