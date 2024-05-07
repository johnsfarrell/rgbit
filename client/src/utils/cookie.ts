import Cookies from "js-cookie";
import { generateAPIKey } from "./key";
import { createUser } from "./api";

/**
 * Sets the cookie with the user's API key (UID).
 * @param uid The user's API key (UID)
 */
export function setKey(uid: string): void {
  Cookies.set("colorful-api", uid);
}

/**
 * Removes the cookie (API key).
 */
export function removeKey(): void {
  Cookies.remove("colorful-api");
}

/**
 * Gets the cookie (API key).
 * @returns {string | undefined} The cookie value.
 */
export function getKey(): string | undefined {
  return Cookies.get("colorful-api");
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
    console.log(e);
    console.error("Failed to verify device signature.");
  }
};
