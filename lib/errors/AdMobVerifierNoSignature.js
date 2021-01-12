class AdMobVerifierNoSignature extends Error {
  constructor (...args) {
    super(args[0] || 'Verification signature not provided');
  }
}

module.exports = AdMobVerifierNoSignature;
