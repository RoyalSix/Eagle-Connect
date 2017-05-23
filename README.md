# Eagle Connect
  - Source Code: http://github.com/RoyalSix/Eagle-Connect
  - Everything you need to know about Biola while on campus, all in one place!

### Installation
- Development System Requirements (MAC):
    - Node JS
         - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
         - Download link: https://nodejs.org/dist/v6.10.3/node-v6.10.3.pkg
        - This project uses many npm packages such as: bad words list, firebase (database management), redux (application state framework), react-native (main compile framework), etc...
    - XCode
        - Xcode includes everything developers need to create great applications for Mac, iPhone, iPad, Apple TV, and Apple Watch. 
        - Download link: https://itunes.apple.com/us/app/xcode/id497799835?mt=12
        - In order to compile this project in a development enviorment you must have Xcode installed.
- Once the above requirements have been installed open the terminal and paste the following command in the directory you would like the project to be created in.
`git clone https://github.com/RoyalSix/Eagle-Connect.git && cd ./Eagle-Connect && npm run new-ios`
- This command will configure a default development enviorment, and build the application.
Note: after installation and the iOS simulator is running you may be displayed with a red screen. Simply reload the iOS simulator by pressing (CMD + R) until the packages are loaded and the app loads completely.
If you experiecne any problems with the building of dependencies, delete the project folder and try again, make sure you have a good internet connection.
- This project uses React-Native to build a mobile app using only JavaScript. It uses the same design as React, allowing us to you compose a rich mobile UI from declarative components.
- React Native uses the same fundamental UI building blocks as regular iOS and Android apps. 
- React-Native comes with many packages that our project utilizes by using react-native altogether as a framework. These packages are all described in the React-Native Docs: http://facebook.github.io/react-native/docs

### Tests
- Test code is located in ./src/js/tests
- Right now while in development phase we are testing the API functions on every initialization of the software.
- Errors will throw an exception, so if app runs, the tests are passing
- Test cases:
    1. API.getJSONFromURL(string: url)
        - This tests the fucntionality of getting back a JSON object from a website url. The website HTML should be transformed into a JSON object with key values for each HTML attribute and tag.
    2. API.getHTMLFromURL(string: url)
       - This tests the functionality of getting back a raw string of a websites HTML.
    3. API.getTime()
        - This tests the functionality of getting the current time in a format of H:M:S in a 12 hour clock format.
    4. API.getTimeFromDateObject(Date: object)
        - This tests the functionality of getting the current time in a format of H:M:S in a 12 hour clock format from a standard javascript Date object.
    5. API.convertArrayToMapDining(object: diningObject, string: dayOfWeek)
        - This tests the functionality of converting a diningObject  (Object parsed from the bon.appetit webiste HTML) into a format readable by the list view component of the dining section for the app. This should only return the object specified by the current day of the week.
    6. API.convertArrayToMapChapels(object: chapelObjec)
        - This tests the functionality of converting a chapelObject (Object parsed from the biola chapels webiste HTML) into a format readable by the list view component of the chapel section for the app.
    7. API.postMessage(string: badWord, string: username)
        - This tests the functionality of a user inputting a bad word in the the message board. This should result in an indicator that it could not be posted.
    8.  API.getBoardMessages()
        - This tests the functionality of receiving all of the messages from the database. This should also detect if messages are expired (12 hour period per message) and delete them from the database.
 - To if the tests output, go to the iOS simulator press (CMD + D) and make sure the device is in debug mode. Then navigate to the open Chrome web browser for the React Native Debugger (If one is not already open a new browser window and paste `http://localhost:8081/debugger-ui` in the url) This will allow you to see console logs from the app. Now go to the top menu and select View --> Developer --> JavaScript Console. Here you will see all the messages related to the tests code. Again, if the app is running (in a development enviorment) then the tests are passing.
