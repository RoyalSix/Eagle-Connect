import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyB4CehGkJrm3pwOdu2gETaxmrtmrPGskxo",
    authDomain: "eagle-connect-65e5b.firebaseapp.com",
    databaseURL: "https://eagle-connect-65e5b.firebaseio.com",
    projectId: "eagle-connect-65e5b",
    storageBucket: "eagle-connect-65e5b.appspot.com",
    messagingSenderId: "1055675326250"
};

export default firebase.initializeApp(firebaseConfig);