const crypto = require('crypto');

const {
  AdMobVerifierKeysUnavailable,
  AdMobVerifierKeyNotFound,
  AdMobVerifierNoSignature,
  AdMobVerifierNoKeyId,
  AdMobVerificationFailed,
} = require('../errors');

const getAdMobKey = require('./getAdMobKey');

/**
 * Verifies request and returns boolean
 *
 * @param url {URL} instance of require('url').URL https://nodejs.org/api/url.html#url_the_whatwg_url_api
 * @param throwable {boolean} defines to throw exception or return boolean on verification problem
 *
 * @throws {AdMobVerifierKeysUnavailable|AdMobVerifierKeyNotFound|AdMobVerifierNoSignature|AdMobVerifierNoKeyId|AdMobVerificationFailed}
 * @return {Promise<boolean>}
 */
async function verify (url, throwable = false) {
  const { search: queryString, searchParams } = url;

  const signature = searchParams.get('signature');
  const keyId = searchParams.get('key_id');

  if (!signature) {
    if (throwable) {
      throw new AdMobVerifierNoSignature();
    }
    return false;
  }

  if (!keyId) {
    if (throwable) {
      throw new AdMobVerifierNoKeyId();
    }
    return false;
  }

  // verificationData = whole string without question mark till signature
  // check serverside-verification-sample-url.txt
  const verificationData = queryString.substring(0, queryString.indexOf('signature') - 1);

  let result = false;

  try {
    const publicKey = await getAdMobKey(keyId);

    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(verificationData);
    result = verifier.verify(publicKey, signature, 'base64');
  } catch (error) {
    if (throwable) {
      throw error;
    }
  }

  if (!result && throwable) {
    throw new AdMobVerificationFailed('Serverside verification request invalid');
  }
  return result;
}

module.exports = verify;
