import * as types from './actionTypes';
import { DOMParser } from 'react-native-html-parser';
import DiningTimeAbbreviation from '../DiningTimeAbbreviation';
import daysOfWeek from '../daysOfWeek';

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
    getHTMLFromURL('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fcafebiola.cafebonappetit.com/cafe/cafe-biola/147727%2F%22&format=json', (result) => {
        var htmlObj = JSON.parse(result);
        var weekMenuURL = htmlObj.query.results.body.div[2].div.div.div.div.section[2].article.div.div["0"].p.span.a.href;
        weekMenuURL = weekMenuURL.split('http://')[1];
        getHTMLFromURL(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2F${weekMenuURL}%2F%22&format=json`, function (data) {
            var DiningDoc = JSON.parse(data);
            var WeeklyDining = DiningDoc.query.results.body.div.div[1].div;
            var allDining = getArrayOfDiningFromNodeList(WeeklyDining);
            callback(allDining);
        });
    })
}

export function getArrayOfDiningFromNodeList(nodeList) {
    var diningListBreakfast = [];
    var diningListLunch = [];
    var diningListDinner = [];
    for (var i = 1; i < nodeList.length; i++) {
        //This loop runs through each row which represents each food station.    
        //i = 0 would pull weekday names, within that array would be days ([0][1] = Mon, [0][2] = Tue)

        for (var j = 1; j < nodeList[i].div.length; j++) {
            //This loop runs through each menu item in row.
            //j = 0 would pull station names, but not needed
            var FoodName = "";
            var FoodDescription = "";
            var FoodTime = "";
            var FoodLocation = "";
            var Day = "";
            try {
                if (nodeList[i].div[j]) {
                    if (nodeList[i].div[j].class.includes('no-item')) continue;
                    if (nodeList[i].div[j].div instanceof Array) {
                        for (var cafeItems of nodeList[i].div[j].div) {
                            FoodName = "";
                            FoodDescription = "";
                            FoodTime = "";
                            FoodLocation = "";
                            Day = "";
                            //This loop runs through each menu item in row if Array.
                            FoodLocation = nodeList[i].div["0"].span.content;
                            FoodLocation = FoodLocation.replace("MTO", "Made To Order");
                            FoodName = cafeItems.div["0"].strong.span.content;
                            FoodName = FoodName.replace("MTO", "Made To Order");
                            FoodTime = cafeItems.span ? cafeItems.span[1].span.strong : cafeItems.div["0"].span[1] ? cafeItems.div["0"].span[1].span.strong : cafeItems.div["0"].span.span.strong;
                            FoodTime = DiningTimeAbbreviation[FoodTime];
                            Day = daysOfWeek[nodeList[0].div[j].content];
                            FoodDescription = cafeItems.div["0"].span["0"] ? cafeItems.div["0"].span["0"].content : "";
                            var foodElement = { FoodName, FoodDescription, FoodTime, FoodLocation, Day };
                            if (FoodTime.includes("Breakfast") && diningListBreakfast.indexOf(foodElement) == -1) diningListBreakfast.push(foodElement);
                            else if (FoodTime.includes("Lunch") && diningListLunch.indexOf(foodElement) == -1) diningListLunch.push(foodElement);
                            else if (FoodTime.includes("Dinner") && diningListDinner.indexOf(foodElement) == -1) diningListDinner.push(foodElement);
                        }
                    }
                    else if (nodeList[i].div[j].div.div instanceof Array) {
                        var cafeItems = nodeList[i].div[j].div.div;
                        FoodLocation = nodeList[i].div["0"].span.content;
                        FoodLocation = FoodLocation.replace("MTO", "Made To Order");
                        FoodName = cafeItems[0].strong.span.content
                        FoodName = FoodName.replace("MTO", "Made To Order");
                        FoodTime = cafeItems[0].span[1] ? cafeItems[0].span[1].span.strong : cafeItems[0].span.span.strong
                        FoodTime = DiningTimeAbbreviation[FoodTime];
                        Day = daysOfWeek[nodeList[0].div[j].content];
                        FoodDescription = cafeItems[0].span[0] ? cafeItems[0].span[0].content : "";
                        var foodElement = { FoodName, FoodDescription, FoodTime, FoodLocation, Day };
                        if (FoodTime.includes("Breakfast") && diningListBreakfast.indexOf(foodElement) == -1) diningListBreakfast.push(foodElement);
                        if (FoodTime.includes("Lunch") && diningListLunch.indexOf(foodElement) == -1) diningListLunch.push(foodElement);
                        if (FoodTime.includes("Dinner") && diningListDinner.indexOf(foodElement) == -1) diningListDinner.push(foodElement);
                    }
                }

            }
            catch (e) {
                debugger;
                console.warn(e)
            }
        }
    }
    console.log(diningListBreakfast, diningListLunch, diningListDinner)
    return [...diningListBreakfast, ...diningListLunch, ...diningListDinner];
}

export function getHTMLFromURL(url, callback) {
    fetch(url).then((response) => response.text()).then((htmlString) => callback(htmlString));
}