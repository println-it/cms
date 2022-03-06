import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json")
});

admin.auth()
    .setCustomUserClaims("2Rg1g603ONMxepWHpzfrlatfhOp1", {admin: true})
    .then(() => {
        console.log("Custom Claim added!")
    })