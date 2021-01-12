class AdMobVerifierInvalidKeyId extends Error {
  constructor (...args) {
    super(args[0] || 'Invalid AdMob key_id');
  }
}

module.exports = AdMobVerifierInvalidKeyId;
