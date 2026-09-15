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
  LOCKED: false,

  // This is NOT the plain password — it's a scrambled (SHA-256) version of it.
  // Default password is: securemysaar
  // Use generate-password.html to make a new one if you change the password.
  PASSWORD_HASH: "17743f6ddc482af9ad67f17684c52ec66748d75d2656ed54a77daa027da89ddd",

  // =========================================================
  // JOURNEY PROGRESS — the round logo marker on "The Journey"
  // timeline.
  //
  // JOURNEY_LIVE: false  -> token hasn't launched yet. Every tier
  //   shows greyed out and locked. This is the current state.
  //
  // JOURNEY_LIVE: true   -> token is trading. The marker lights up
  //   at JOURNEY_ATH_TIER and every tier up to it.
  //   0 = ₹50K (The Nobody) ... 8 = ₹500M (The Top)
  //
  // JOURNEY_ATH_TIER tracks the coin's ALL-TIME HIGH market cap,
  // not the current one — it should only ever move UP, never back
  // down, even if the market cap later drops.
  //
  // For now both are set by hand. Once the token is live on
  // Dexscreener, JOURNEY_LIVE can flip to true and a scheduled job
  // can keep raising JOURNEY_ATH_TIER automatically as the ATH
  // market cap grows (never lowering it).
  // =========================================================
  JOURNEY_LIVE: false,
  JOURNEY_ATH_TIER: 0
};
