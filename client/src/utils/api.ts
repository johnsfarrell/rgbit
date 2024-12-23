import axios from "axios";
import { BALANCE_URI, COLORIZE_URI, FETCH_URI } from "./constants";
import { getKey } from "./cookie";
import { FAILED_FETCH_BALANCE, FAILED_FETCH_IMAGE, NO_API_KEY } from "./desc";

/**
 * Checks the type of the colorize post API response data.
 * @param data The colorize post API response data
 * @returns {data is { status: 200 | 403 | 402 | 500, remainingBalance: number, refresh: Date, redirect: string }} Returns true if the data is of the correct type.
 */
const checkColorizeResponse = (
  data: any
): data is {
  status: 200 | 403 | 402 | 500;
  remainingBalance: number;
  refresh: Date;
  redirect: string;
  imageId: string;
} => {
  return (
    (data.status === 200 ||
      data.status === 403 ||
      data.status === 402 ||
      data.status === 500) &&
    typeof data.remainingBalance === "number" &&
    typeof data.refresh === "string" &&
    new Date(data.refresh) instanceof Date &&
    typeof data.redirect === "string" &&
    typeof data.imageId === "string"
  );
};

/**
 * Colorizes a post image.
 *
 * From server docs:
 * If the user does not exist, returns 403.
 * If the user's balance is less than 1, returns 402.
 * If user's balance > 0, colorizes image, returns 200.
 *
 * @param file The image to colorize.
 * @returns {Promise<{ status: 200 | 403 | 402 | 500, remainingBalance: number, refresh: Date, redirect: string, imageId: string }>} Returns the status and code of the response.
 */
export const colorizePost = async (file?: File) => {
  const failure = {
    remainingBalance: -1,
    refresh: new Date(),
    redirect: "",
    imageId: ""
  };

  if (!file) return { status: 400, ...failure };

  const formData = new FormData();
  formData.append("image", file);
  const headers = { "Content-Type": "multipart/form-data" };

  try {
    const res = await axios.post(COLORIZE_URI + getKey(), formData, {
      headers
    });

    if (checkColorizeResponse(res.data)) {
      return res.data;
    }

    return { status: 500, ...failure };
  } catch (e: any) {
    if (e.response && e.response.status) {
      return { status: e.response.status, ...failure };
    }
    return { status: 500, ...failure };
  }
};

/**
 * Checks the type of the balance API response data.
 * @param data balance API response data
 * @returns {data is { balance: number, refresh: Date }} Returns true if the data is of the correct type.
 */
const checkTypeBalance = (
  data: any
): data is { balance: number; refresh: Date } => {
  return (
    typeof data.balance === "number" &&
    typeof data.refresh === "string" &&
    new Date(data.refresh) instanceof Date
  );
};

/**
 * Gets the user's balance.
 * @returns {Promise<{ balance: number, refresh: Date, error?: Error }>} Returns the balance and time until refresh.
 */
export const getBalance = async (): Promise<{
  balance: number;
  refresh: Date;
}> => {
  const key = getKey();
  if (!key) throw new Error(NO_API_KEY);

  const res = await axios.get(BALANCE_URI + key);
  if (res.status === 200 && checkTypeBalance(res.data)) {
    return res.data;
  }

  throw new Error(FAILED_FETCH_BALANCE);
};

/**
 * Checks the type of the create user API response status.
 * @param status The create user API response status
 * @returns {status is 200 | 203 | 400 | 403 | 500} Returns true if the status is of the correct type.
 */
const checkTypeCreateUserStatus = (
  status: any
): status is 200 | 203 | 400 | 403 | 500 => {
  return (
    status === 200 ||
    status === 203 ||
    status === 400 ||
    status === 403 ||
    status === 500
  );
};

/**
 * Creates a new user.
 *
 * From server docs:
 * If key or encryptedKey is missing, returns 400.
 * If user already exists, returns 204.
 * If keys do not match, returns 403 (Forbidden).
 * If user creation fails, returns 500.
 * If user creation is successful, returns 200.
 *
 * @param key The user's key.
 * @param encryptedKey The user's encrypted key.
 * @returns {Promise<200 | 203 | 400 | 403 | 500>} Returns the status of the response.
 */
export const createUser = async (
  key: string,
  encryptedKey: string
): Promise<200 | 203 | 400 | 403 | 500> => {
  const query = `${process.env.REACT_APP_API_URL}/user/create`;
  const res = await axios.post(query, { key, encryptedKey });
  const status = res.status;

  if (checkTypeCreateUserStatus(status)) return status;
  return 500;
};

/**
 * Fetches an image from the server.
 * @param id The id of the image to fetch.
 * @returns {Promise<{ colored: string }>} Returns the status and image data.
 */
export const fetchImage = async (id: string) => {
  const res = await axios.get(`${FETCH_URI}${id}`);

  function bufferToURL(bufferArray: ArrayBuffer) {
    let blob = new Blob([new Uint8Array(bufferArray)], { type: "image/png" });
    return URL.createObjectURL(blob);
  }

  const colored = bufferToURL(res.data.colored.data);

  if (res.status === 200) {
    return { colored };
  }

  throw new Error(FAILED_FETCH_IMAGE);
};

/**
 * Fetches the total number of users.
 * @returns {Promise<number>} Returns the total number of users.
 */
export const getTotalUsers = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/total`);
    return res.data.total;
  } catch (e) {
    return 0;
  }
};

/**
 * Fetches the total number of photos colorized.
 * @returns {Promise<number>} Returns the total number of photos.
 */
export const getTotalImages = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/image/total`);
    return res.data.total;
  } catch (e) {
    return 0;
  }
};
