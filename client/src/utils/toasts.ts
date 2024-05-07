import { UseToastOptions } from "@chakra-ui/react";

export const FAILED_IMAGE_TOAST = {
  title: "Failed to load this image.",
  status: "error",
  duration: 2000,
  isClosable: true,
} as UseToastOptions;

export const FILE_REJECTED_TOAST = {
  title: "File rejected.",
  description: "Please upload a valid image file.",
  status: "error",
  duration: 3000,
  isClosable: true,
} as UseToastOptions;

export const COPY_TOAST = {
  title: "Copied to clip board!",
  status: "success",
  duration: 1000,
  isClosable: true,
} as UseToastOptions;

export const LOW_BALANCE_TOAST = {
  title: "Insufficient balance. Please wait.",
  status: "warning",
  duration: 2000,
  isClosable: true,
} as UseToastOptions;

export const RESTORE_ERROR_TOAST = {
  title: "Failed to restore image, please try again.",
  status: "error",
  duration: 2000,
  isClosable: true,
} as UseToastOptions;
