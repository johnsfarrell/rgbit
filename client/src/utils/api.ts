import axios from "axios";
import { BALANCE_URI, COLORIZE_URI, FETCH_URI } from "./constants";
import { getKey } from "./cookie";

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
} => {
  return (
    (data.status === 200 ||
      data.status === 403 ||
      data.status === 402 ||
      data.status === 500) &&
    typeof data.remainingBalance === "number" &&
    typeof data.refresh === "string" &&
    new Date(data.refresh) instanceof Date &&
    typeof data.redirect === "string"
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
 * @returns {Promise<{ status: 200 | 403 | 402 | 500, remainingBalance: number, refresh: Date, redirect: string }>} Returns the status and code of the response.
 */
export const colorizePost = async (file?: File) => {
  const failure = { remainingBalance: -1, refresh: new Date(), redirect: "" };

  if (!file) return { status: 400, ...failure };

  const formData = new FormData();
  formData.append("image", file);

  // TODO: upload image
  const res = await axios.post(COLORIZE_URI + getKey(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (checkColorizeResponse(res.data)) {
    return res.data;
  }

  return { status: 500, ...failure };
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
  error?: Error;
}> => {
  const res = await axios.get(BALANCE_URI + getKey());

  if (res.status === 200 && checkTypeBalance(res.data)) {
    return res.data;
  }

  return { balance: 0, refresh: new Date(), error: res.data };
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
 * @returns {Promise<{ status: 200 | 404, colored: string, orignal: string }>} Returns the status and image data.
 */
export const fetchImage = async (id: string) => {
  const res = await axios.get(`${FETCH_URI}${id}`);

  function bufferToURL(bufferArray: ArrayBuffer) {
    let blob = new Blob([new Uint8Array(bufferArray)], { type: "image/png" });
    return URL.createObjectURL(blob);
  }

  const colored = bufferToURL(res.data.colored.data);
  const original = bufferToURL(res.data.original.data);

  if (res.status === 200) {
    return { status: 200, colored, original };
  }

  return { status: 404, colored: "", original: "" };
};
