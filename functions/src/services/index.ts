import * as envelopeController from "../controllers";
import * as I from "../Interfaces";
import * as functions from "firebase-functions";

/**
 * @method getMyOpenEnvelops
 * @description return a list of all open envelops user is involved in.
 * @param data - not used here
 * @param context - default firebase cloud onCall function context
 * @returns envelops || err || undefined
 */
export const getMyOpenEnvelops = async (
  data: any,
  context: functions.https.CallableContext
): Promise<string | I.IEnvelop[]> => {
  try {
    const uid = context.auth?.uid;
    if (uid) {
      const envelops = await envelopeController.getEnvelops(uid);
      return envelops;
    }
    return "You need to login";
  } catch (err) {
    return err;
  }
};

/**
 * @method getFileForEnvelope
 * @description - find and return file url from cloud storage
 * @param data - document id and envelope id, used to find file in storage
 * @param context - default firebase cloud onCall function context
 * @returns err || url of file from storage
 */

export const getFileForEnvelope = async (
  data: I.DownloadFileDto,
  context: functions.https.CallableContext
): Promise<string> => {
  try {
    const { document, envelope } = data;
    const uid = context.auth?.uid;
    if (uid) {
      const isValid = await envelopeController.isUserInvolved(uid, envelope);
      if (isValid) {
        const file = await envelopeController.getFile({ document, envelope });
        return file;
      }
      return "You do not have access to this resource";
    } else {
      return "You need to login";
    }
  } catch (err) {
    return err;
  }
};

/**
 * @method singInAndLogin
 * @description - create user with given email and password, then log in user
 * @param data - user email and password
 * @returns err || token
 */
export const singInAndLogin = async (data: I.IUserCred): Promise<string> => {
  try {
    const token = await envelopeController.createUserAndLogin({
      email: data.email,
      password: data.password,
    });
    return token;
  } catch (err) {
    return err;
  }
};
