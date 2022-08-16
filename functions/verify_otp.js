const admin = require("firebase-admin");

module.exports = (request, response) => {
  // Verify that number is provided
  if (!request.body.code || !request.body.number) {
    response.status(422).send("Bad input");
  }

  // Format phone number and code
  const phone = String(request.body.number).replace(/\D/g, "");
  const code = parseInt(request.body.code);

  // Get access to current user and compare codes
  admin.auth().getUser(phone)
      .then(() => {
        const ref = admin.database().ref("users/" + phone);
        ref.on("value", (snapshot) => {
          ref.off();
          const user = snapshot.val();

          if (user.code !== code || !user.codeValid) {
            response.status(422).send({error: "Code is not valid"});
          }

          ref.update({codeValid: false});
          admin.auth().createCustomToken(phone)
              .then((token) => response.send({token: token}));
        });
      })
      .catch((error) => response.status(422).send({error: error}));
};
