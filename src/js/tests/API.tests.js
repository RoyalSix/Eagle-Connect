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
    const user = {
        name: "tj",
    }
    try {
        user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');
        API.getJSONFromURL("stackoverflow.com", (resultObj) => {
            resultObj.body.div["0"].id.should.be.a.String();
        })
        API.getHTMLFromURL("https://www.google.com", (resultString) => {
            let regexMatch = resultString.match(/<meta content="noodp"/);
            regexMatch.should.have.length(1);
        })
       var currentTime = API.getTime();
       currentTime.split(" ")[1] == "AM" || currentTime.split(" ")[1] == "PM";
       assert(API.getTime() == API.getTimeFromDateObject(new Date()));
       daysOfWeek.should.matchAny(API.getDay());
       //API.convertArrayToMapDining()
    } catch (e) {
        if (__DEV__) throw Error(e)
    }
}