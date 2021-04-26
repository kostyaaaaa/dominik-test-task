import * as config from "./env.json";

const env = config.firebase;

export const storageBucket = env.storageBucket;
export const functionsEmulatorPort = env.functionsEmulatorPort;
export const authEmulatorUrl = env.authEmulatorUrl;

export default {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
};
