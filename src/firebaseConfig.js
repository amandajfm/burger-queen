import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDY6M2Cxfxf1HD7OUk0sU8V_a4TkJegoKQ",
    authDomain: "burger-queen-1fd95.firebaseapp.com",
    databaseURL: "https://burger-queen-1fd95.firebaseio.com",
    projectId: "burger-queen-1fd95",
    storageBucket: "",
    messagingSenderId: "143861148309",
    appId: "1:143861148309:web:94a420b7ac40b8d9"
};

firebase.initializeApp(config);

export default firebase;