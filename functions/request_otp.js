const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = (request, response) => {
  // Validate that number is provided
  if (!request.body.number) {
    response.status(422).send("Bad input");
  }

  // Format phone number
  const phone = String(request.body.number).replace(/\D/g, "");

  // Find user model
  admin.auth().getUser(phone)
      .then((userData) => {
        const code = Math.floor((Math.random() * 9999 + 1000));
        twilio.messages.create({
          to: `+${phone}`,
          from: "+18304832545",
          body: `Ahoy, your code is: ${code}`,
        }).then(() => {
          admin.database().ref("users/" + phone)
              .update({code: code, codeValid: true});
        }).catch((error) => response.status(422).send({error}));
      })
      .catch((error) => response.status(422).send({error}));
};

