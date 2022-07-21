const admin = require("firebase-admin");

module.exports = (request, response) => {
  // Verify that number is provided
  if (!request.body.number) {
    response.status(422).send("Bad input");
  }

  // Format phone number
  const phone = String(request.body.number).replace(/\D/g, "");

  // Create new user account
  admin.auth().createUser({uid: phone})
      .then((user) => response.send(user))
      .catch((error) => response.status(422).send({error}));
  // Send success request
};
