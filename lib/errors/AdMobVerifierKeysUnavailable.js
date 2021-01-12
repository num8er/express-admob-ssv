class AdMobVerifierKeysUnavailable extends Error {
  constructor (...args) {
    super(args[0] || 'Cannot get AdMob verifier keys');
  }
}

module.exports = AdMobVerifierKeysUnavailable;
