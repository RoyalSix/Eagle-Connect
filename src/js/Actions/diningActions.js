import * as types from './actionTypes';
import { DOMParser } from 'react-native-html-parser';
import * as API from '../API'

export function startDiningLoad() {
    return function (dispatch) {

        dispatch({
            type: types.START_DINING_LOAD,
            loadingDining: true
        })

        return getDiningItems((dining) => {
            dispatch(receiveDiningItems(dining))
        })
    }
}

export function receiveDiningItems(dining) {
    return { 
        type: types.RECEIVE_DINING_LOAD,
        loadingDining: false,
        dining: dining
    }
}

export function getDiningItems(callback) {
    getHTMLFromURL('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Flegacy.cafebonappetit.com/weekly-menu/147727%2F%22&format=json', function (data) {
        var DiningDoc = JSON.parse(data);
        var WeeklyDining = DiningDoc.query.results.body.div.div[1].div;
        var allDining = getArrayOfDiningFromNodeList(WeeklyDining);
        callback(allDining);
        
    });
}

export function getArrayOfDiningFromNodeList(nodeList) 
{
    var diningList = [];
    
    for (var i = 1; i < nodeList.length; i++) 
    {
        //This loop runs through each row which represents each food station.    
        //i = 0 would pull weekday names, within that array would be days ([0][1] = Mon, [0][2] = Tue)

        for (var j = 1; j < nodeList[i].div.length; j++) 
        {
            //This loop runs through each menu item in row.
            //j = 0 would pull station names, but not needed.

            var FoodName = "";
            var FoodDescription = "";
            var FoodTime = "";

            if(nodeList[i].div[j].div instanceof Array) 
            {
                for (var x = 0; x < nodeList[i].div[j].div.length; x++) 
                {
                    //This loop runs through each menu item in row if Array.

                    try 
                    {
                        FoodName =          nodeList[i].div[j].div[x].div["0"].strong.span.content;
                        FoodDescription =   nodeList[i].div[j].div[x].div["0"].span["0"].content;
                        FoodTime =          nodeList[i].div[j].div[x].div["0"].span[1].span.strong;
                    } 
                    catch (e) { }
                
                    diningList.push({FoodName, FoodDescription, FoodTime});
                }
            }
            else 
            {
                try 
                {
                    FoodName =          nodeList[i].div[j].div.div["0"].strong.span.content;
                    FoodDescription =   nodeList[i].div[j].div.div["0"].span["0"].content;
                    FoodTime =          nodeList[i].div[j].div.div["0"].span[1].span.strong;
                } 
                catch (e) { }

                diningList.push({FoodName, FoodDescription, FoodTime});
            }
        }
    }

    return diningList;
}

export function getHTMLFromURL(url, callback) {
    fetch(url).then((response) => response.text()).then((htmlString) => callback(htmlString));
}