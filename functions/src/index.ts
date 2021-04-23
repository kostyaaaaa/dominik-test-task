import * as functions from "firebase-functions";
import * as envelopService from "./services";
import firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./config/config";

firebase.initializeApp(firebaseConfig);
firebase.functions().useEmulator("localhost", 5001);
firebase.auth().useEmulator("http://localhost:9099");
firebase
  .auth()
  .createUserWithEmailAndPassword("kostyaarabadji@gmail.com", "123123123");
firebase
  .auth()
  .signInWithEmailAndPassword("kostyaarabadji@gmail.com", "123123123");

export const getFileForEnvelope = functions.https.onCall(
  envelopService.getFileForEnvelope
);

export const getMyOpenEnvelops = functions.https.onCall(
  envelopService.getMyOpenEnvelops
);
