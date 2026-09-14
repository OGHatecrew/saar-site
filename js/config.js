// =========================================================
// SAAR SITE SETTINGS — edit this file to lock/unlock the site
// =========================================================
//
// TO MAKE THE SITE PRIVATE (password required):
//   1. Set LOCKED to true
//   2. Set PASSWORD_HASH by running generate-password.html (see README.md)
//
// TO MAKE THE SITE PUBLIC (no password):
//   1. Set LOCKED to false
//
// After editing this file, save it and push/redeploy the site
// (see README.md for exact steps for your host).

window.SITE_CONFIG = {
  LOCKED: true,

  // This is NOT the plain password — it's a scrambled (SHA-256) version of it.
  // Default password is: securemysaar
  // Use generate-password.html to make a new one if you change the password.
  PASSWORD_HASH: "17743f6ddc482af9ad67f17684c52ec66748d75d2656ed54a77daa027da89ddd"
};
