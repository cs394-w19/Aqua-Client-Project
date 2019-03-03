import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
    apiKey: "AIzaSyB11yCSN9x1kE7Th3yZk_YnSBiizCyaVqQ",
    authDomain: "https://glocal-1234.firebaseapp.com",
    databaseURL: "https://glocal-1234.firebaseio.com",
    storageBucket: "gs://glocal-1234.appspot.com",
    projectId:"glocal-1234"
};

firebase.initializeApp(config);


export default firebase