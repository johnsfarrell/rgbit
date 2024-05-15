import Cookies from "js-cookie";
import { generateAPIKey } from "./key";
import { createUser } from "./api";
import { FAILED_VERIFY_SIGNATURE } from "./desc";

/**
 * Sets the cookie with the user's API key (UID).
 * @param uid The user's API key (UID)
 */
export function setKey(uid: string): void {
  Cookies.set("rgbit-api", uid);
}

/**
 * Removes the cookie (API key).
 */
export function removeKey(): void {
  Cookies.remove("rgbit-api");
}

/**
 * Gets the cookie (API key).
 * @returns {string | undefined} The cookie value.
 */
export function getKey(): string | undefined {
  return Cookies.get("rgbit-api");
}

/**
 * Generates an API key and attempts to create a user.
 * @returns {Promise<void>} - Returns a promise that resolves when the cookie is set.
 */
export const cookieAPI = async () => {
  // if already has api key (cookie), return
  if (getKey()) return;

  // generate an api key and attempt to create user
  try {
    const { key, signature } = await generateAPIKey();
    const createStatus = await createUser(key, signature);
    // 200: created, 204: already exists
    if (createStatus >= 200) {
      setKey(key);
      return;
    }
  } catch (e: any) {
    console.error(FAILED_VERIFY_SIGNATURE);
  }
};
