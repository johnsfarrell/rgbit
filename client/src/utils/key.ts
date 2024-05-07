const FingerprintJS = require("@fingerprintjs/fingerprintjs");
const CryptoJS = require("crypto-js");
const forge = require("node-forge");

const publicKey = process.env.REACT_APP_PUBLIC_KEY;

/**
 * Generates a unique fingerprint for the given device.
 * Uses the FingerprintJS library.
 * @returns {Promise<string>} unique fingerprint
 */
async function generateFingerprint(): Promise<string> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

/**
 * One-way encrypts input data.
 * Using CryptoJS to create an irreversible hash (MD5).
 * @param {string} data
 * @returns {string} encrypted data
 */
function irreversibleEncrypt(data: string): string {
  return CryptoJS.MD5(data).toString();
}

/**
 * Two-way encrypts input data using a public key.
 * Using node-forge to create an RSA-OAEP encrypted string.
 * @param {string} data
 * @param {string} publicKey
 * @returns {string} encrypted data
 */
function reversibleEncrypt(data: string, publicKey: string): string {
  const encryptor = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = encryptor.encrypt(data, "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

/**
 * Generates a unique API key using unique device fingerprint.
 * The fingerprint is encrypted using irreversible encryption for security.
 * @returns {Promise<{ key: string, signature: string }>} encrypted key and signature
 */
export const generateAPIKey = (): Promise<{
  key: string;
  signature: string;
}> => {
  return generateFingerprint().then((fingerprint) => {
    const encrypted1 = irreversibleEncrypt(fingerprint);
    const encrypted2 = reversibleEncrypt(encrypted1, publicKey!);
    return { key: encrypted1, signature: encrypted2 };
  });
};
