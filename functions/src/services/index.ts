import * as envelopeController from "../controllers";
import * as I from "../Interfaces";
import * as functions from "firebase-functions";

/**
 * @method getMyOpenEnvelops
 * @description return a list of all open envelops user is involved in.
 * @param data - not used here
 * @param context - default firebase cloud onCall function context
 * @returns envelops || err
 */
export const getMyOpenEnvelops = async (
  data: any,
  context: functions.https.CallableContext
) => {
  try {
    const uid = context.auth?.uid;
    console.log("hello", context.auth);
    if (uid) {
      const envelops = await envelopeController.getEnvelops(uid);
      return envelops;
    }
    return;
  } catch (err) {
    return err;
  }
};

/**
 * @method getFileForEnvelope
 * @description - find and return file from cloud storage
 * @param data - document id and envelope id, used to find file in storage
 * @param context - default firebase cloud onCall function context
 * @returns err || file from storage
 */

export const getFileForEnvelope = async (
  data: I.DownloadFileDto,
  context: functions.https.CallableContext
) => {
  try {
    const { document, envelope } = data;
    const file = await envelopeController.getFile({ document, envelope });
    return file;
  } catch (err) {
    return err;
  }
};
