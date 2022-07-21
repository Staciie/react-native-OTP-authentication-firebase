const twilio = require("twilio");
const process = require("./process");

const accountSid = process.TWILIO_ACCOUNT_SID;
const authToken = process.TWILIO_AUTH_TOKEN;

module.exports = new twilio.Twilio(accountSid, authToken);
