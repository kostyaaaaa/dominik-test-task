import * as I from "../Interfaces";
const admin = require("firebase-admin");
import * as serviceAccount from "../config/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dominik-test-task1.appspot.com",
  auth: {
    uid: "WVb6VcV4kwU78c9x15CawLbgbBgN",
    email: "kostyaarabadji@gmail.com",
  },
});

const db = admin.firestore();

/**
 * @method getEnvelops
 * @description - find in db envelops user is involved in
 * @param id - user id
 * @returns list of all open envelops user is involved in || [] || err
 */

export const getEnvelops = async (id: string) => {
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

export const getFile = async ({ document, envelope }: I.DownloadFileDto) => {
  try {
    const bucket = admin.storage().bucket();

    const filePath = `envelopes/${envelope}/${document}`;
    const options = {
      version: "v2",
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 3, // 3 hours
    };
    const [url] = await bucket.file(filePath).getSignedUrl(options);
    console.log(url);
    return url;
  } catch (err) {
    return err;
  }
};
