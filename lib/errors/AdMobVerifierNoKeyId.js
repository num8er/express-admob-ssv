class AdMobVerifierNoKeyId extends Error {
  constructor (...args) {
    super(args[0] || 'Verification key_id not provided');
  }
}

module.exports = AdMobVerifierNoKeyId;
