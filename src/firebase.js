import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDhG_mExGNvWJD1VpNWHX7SgCXJ4_azqNI",
    authDomain: "social-media-399217.firebaseapp.com",
    projectId: "social-media-399217",
    storageBucket: "social-media-399217.appspot.com",
    messagingSenderId: "682765479533",
    appId: "1:682765479533:web:98c795d148b4bfba2e1964",
    measurementId: "G-X2F8L2F2ES"
}).auth()