class AdMobVerifierKeyNotFound extends Error {
  constructor (...args) {
    super(args[0] || 'AdMob verifier key not found');
  }
}

module.exports = AdMobVerifierKeyNotFound;
