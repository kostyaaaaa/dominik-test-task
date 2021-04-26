import * as I from "../Interfaces";
const admin = require("firebase-admin");
import * as serviceAccount from "../config/serviceAccountKey.json";
import { storageBucket } from "../config/config";
import firebase from "firebase";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket,
});

const db = admin.firestore();

/**
 * @method getEnvelops
 * @description - find in db envelops user is involved in
 * @param id - user id
 * @returns list of all open envelops user is involved in || [] || err
 */

export const getEnvelops = async (id: string): Promise<I.IEnvelop[]> => {
  try {
    const envelopsSnap = await db
      .collection("envelops")
      .where("users", "array-contains", id)
      .get();
    if (envelopsSnap.empty) {
      return [];
    } else {
      const envelops = envelopsSnap.docs.map((e: I.IEnvelop) => e.data());
      return envelops;
    }
  } catch (err) {
    return err;
  }
};

/**
 * @method getFile
 * @description - download file from cloud storage
 * @param param.document - document id
 * @param param.envelope - envelope id
 * @returns Link for file downloading file || file || err
 */

export const getFile = async ({
  document,
  envelope,
}: I.DownloadFileDto): Promise<string> => {
  try {
    const bucket = admin.storage().bucket();

    const filePath = `envelopes/${envelope}/${document}`;
    const options = {
      version: "v2",
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 3, // 3 hours
    };
    const [url] = await bucket.file(filePath).getSignedUrl(options);
    return url;
  } catch (err) {
    return err;
  }
};

/**
 * @method createUserAndLogin
 * @description - create user with email, password and login
 * @param param0 - user email
 * @param param1 - user password
 * @returns err || token
 */
export const createUserAndLogin = async ({
  email,
  password,
}: I.IUserCred): Promise<string> => {
  try {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await admin.auth().createCustomToken(createdUser.user?.uid);
    return token;
  } catch (err) {
    return err;
  }
};

/**
 * @method isUserInvolved
 * @description - check if user is involved in envelope
 * @param uid - user id
 * @param envelope - envelope id
 * @returns boolean value
 */
export const isUserInvolved = async (
  uid: string,
  envelope: string
): Promise<boolean> => {
  try {
    const envelopeSnap = db.collection("envelops").doc(envelope);
    const envelopeDoc = await envelopeSnap.get();
    if (envelopeDoc.exists) {
      return envelopeDoc.data().users?.includes(uid);
    }
    return false;
  } catch (err) {
    return false;
  }
};
