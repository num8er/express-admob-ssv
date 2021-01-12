const crypto = require('crypto');
const { KeyObject } = crypto;
const axios = require('axios');

const { AdMobVerifierKeysUnavailable, AdMobVerifierKeyNotFound } = require('../errors');

/**
 * Returns public KeyObject from Google AdMob verifier keys
 *
 * @param keyId {String} key identifier from ssv request
 *
 * @throws {AdMobVerifierKeysUnavailable|AdMobVerifierKeyNotFound}
 * @return {Promise<KeyObject>}
 */
async function getAdMobKey (keyId) {
  const url = 'https://gstatic.com/admob/reward/verifier-keys.json';
  const { data: { keys: verifierKeys } } = await axios.get(url);
  if (!verifierKeys || !Array.isArray(verifierKeys)) {
    throw new AdMobVerifierKeysUnavailable();
  }

  const verifierKey = verifierKeys.find(verifierKey => verifierKey.keyId === keyId);
  if (!verifierKey) {
    throw new AdMobVerifierKeyNotFound();
  }

  return crypto.createPublicKey(verifierKey.pem);
}

module.exports = getAdMobKey;