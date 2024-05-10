const forge = require("node-forge");

/**
 * Decrypts input data using a public key.
 * @param {string} encrypted - data to decrypt
 * @param {string} key - public key to use for decryption
 * @returns {string} decrypted data
 */
function decrypt(encrypted, key) {
  const decryptor = forge.pki.privateKeyFromPem(key);
  const decrypted = decryptor.decrypt(
    forge.util.decode64(encrypted),
    "RSA-OAEP"
  );
  return decrypted;
}

/**
 * Verifies that the input key matches the decrypted key.
 * Used to verify that a user is authorized to perform an action.
 * @param {string} key - key to verify
 * @param {string} encryptedKey - encrypted key to compare against
 * @returns {boolean} true if keys match, false otherwise
 */
function verifySignature(key, encryptedKey) {
  const decryptedKey = decrypt(encryptedKey, process.env.SERVER_KEY);
  return key === decryptedKey;
}

/**
 * Generates a unique key of 16 characters.
 * @returns {string} a unique key
 */
function generateUniqueKey() {
  return forge.util.bytesToHex(forge.random.getBytesSync(8));
}

module.exports = {
  verifySignature,
  generateUniqueKey,
};
