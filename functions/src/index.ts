import * as functions from "firebase-functions";
import * as envelopService from "./services";
import firebase from "firebase";
import "firebase/auth";
import firebaseConfig, {
  authEmulatorUrl,
  functionsEmulatorPort,
} from "./config/config";

firebase.initializeApp(firebaseConfig);
firebase.functions().useEmulator("localhost", functionsEmulatorPort);
firebase.auth().useEmulator(authEmulatorUrl);

export const getFileForEnvelope = functions.https.onCall(
  envelopService.getFileForEnvelope
);

export const getMyOpenEnvelops = functions.https.onCall(
  envelopService.getMyOpenEnvelops
);

export const createUserAndLogin = functions.https.onCall(
  envelopService.singInAndLogin
);
