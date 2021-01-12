class AdMobVerificationFailed extends Error {
  constructor (...args) {
    super(args[0] || 'Invalid AdMob Server-Side Verification request');
  }
}

module.exports = AdMobVerificationFailed;
