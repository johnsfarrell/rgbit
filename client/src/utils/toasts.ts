import { UseToastOptions } from "@chakra-ui/react";

const errorParams = {
  status: "error",
  duration: 2000,
  isClosable: true,
} as UseToastOptions;

export const FAILED_IMAGE_TOAST = {
  title: "Failed to load this image.",
  ...errorParams,
} as UseToastOptions;

export const FILE_REJECTED_TOAST = {
  title: "File rejected.",
  description: "Please upload a valid image file.",
  ...errorParams,
} as UseToastOptions;

export const COPY_TOAST = {
  title: "Copied to clip board!",
  status: "success",
  duration: 1000,
  isClosable: true,
} as UseToastOptions;

export const LOW_BALANCE_TOAST = {
  title: "Insufficient balance. Please wait.",
  ...errorParams,
} as UseToastOptions;

export const RESTORE_ERROR_TOAST = {
  title: "Failed to restore image, please try again.",
  ...errorParams,
} as UseToastOptions;

export const VERIFICATION_ERROR_TOAST = {
  title: "Failed to verify your API request.",
  ...errorParams,
} as UseToastOptions;

export const API_LIMIT_TOAST = {
  title: "API limit reached. Please try again later.",
  ...errorParams,
} as UseToastOptions;
