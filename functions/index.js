const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create_user");
const requestOTP = require("./request_otp");
const verifyOTP = require("./verify_otp");

const serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://otp-auth-7a375-default-rtdb.firebaseio.com",
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOtp = functions.https.onRequest(requestOTP);
exports.verifyOtp = functions.https.onRequest(verifyOTP);
