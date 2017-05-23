import should from 'should';
import * as API from '../API'
import daysOfWeek from '../daysOfWeek';

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

export default function () {
    const diningData = [
        {
            Day: "Monday",
            FoodDescription: "choice of scrambled egg, breakfast potatoes, breakfast meats, flour tortillas, cheese, and chef choice salsa",
            FoodLocation: "HOT BREAKFAST @ HOME COOKIN'",
            FoodName: "hot breakfast bar",
            FoodTime: "Breakfast"
        },
        {
            Day: "Tuesday",
            FoodDescription: "scrambled eggs, roasted potatoes, pork sausage",
            FoodLocation: "HOT BREAKFAST @ HOME COOKIN'",
            FoodName: "hot breakfast bar",
            FoodTime: "Breakfast"
        }
    ]

    const chapelData = [
        {
            date: "Mon, Jan 30, 9:30 AM",
            location: "Chase Gymnasium",
            speaker: "Todd Pickett",
            title: "Monday Word Chapel: Introduction to the Spring Semester"
        },
        {
            date: "Tue, Jan 31, 9:30 AM",
            location: "Calvary Chapel",
            speaker: "",
            title: "Talbot Chapel"
        }
    ]
    const BAD_WORD = atob("ZnVjaw==");
    try {
        API.getJSONFromURL("stackoverflow.com", (resultObj) => {
            console.log('Testing', 'API.getJSONFromURL("stackoverflow.com")')
            resultObj.body.div["0"].id.should.be.a.String();
            console.log('Success ✓')
        })
        API.getHTMLFromURL("https://www.google.com", (resultString) => {
            console.log('Testing', 'API.getHTMLFromURL("https://www.google.com")')
            let regexMatch = resultString.match(/<meta content="noodp"/);
            regexMatch.should.have.length(1);
            console.log('Success ✓')
        })

        console.log('Testing', 'API.getTime()', 'and API.getTimeFromDateObject()')
        var currentTime = API.getTime();
        currentTime.split(" ")[1] == "AM" || currentTime.split(" ")[1] == "PM";
        assert(API.getTime() == API.getTimeFromDateObject(new Date()), "API.getTime() != API.getTimeFromDateObject(new Date())");
        daysOfWeek.should.matchAny(API.getDay());
        console.log('Success ✓')

        console.log('Testing', 'API.convertArrayToMapDining(diningData, "Tuesday")')
        let mappedDiningData = API.convertArrayToMapDining(diningData, 'Tuesday');
        mappedDiningData.should.have.property('Breakfast');
        mappedDiningData['Breakfast'].should.be.a.Array();
        mappedDiningData['Breakfast'][0].should.have.property('Day').which.is.a.String();
        mappedDiningData['Breakfast'][0].should.have.property('FoodDescription').which.is.a.String();
        mappedDiningData['Breakfast'][0].should.have.property('FoodLocation').which.is.a.String();
        mappedDiningData['Breakfast'][0].should.have.property('FoodName').which.is.a.String();
        mappedDiningData['Breakfast'][0].should.have.property('FoodTime').which.is.exactly('Breakfast').and.is.a.String()
        console.log('Success ✓')

        console.log('Testing', 'API.convertArrayToMapChapels(chapelData)')
        let mappedChapelData = API.convertArrayToMapChapels(chapelData);
        mappedChapelData.should.have.propertyByPath("Monday Jan 30","0","picture").eql("biola_gym");
        mappedChapelData.should.matchAny(function(value) { if (value[0]) value[0].should.containDeep({speaker:""})});
        console.log('Success ✓')

        API.postMessage(BAD_WORD, 'John Smith', (result)=>{
            console.log('Testing', 'API.postMessage(BAD_WORD, "John Smith"))')
            should.not.exist(result);
            console.log('Success ✓')
        }, true);

        API.getBoardMessages((result)=>{
            console.log('Testing', 'API.getBoardMessages((result))')
            result.should.matchAny(function(value) { value.should.have.property("message")});
            result.should.matchAny(function(value) { value.should.have.property("time")});
            result.should.matchAny(function(value) { value.should.have.property("username")});
            console.log('Success ✓')
        })

    } catch (e) {
        throw Error(e)
    }
}