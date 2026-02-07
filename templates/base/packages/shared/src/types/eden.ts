import type { ApiError } from "./api.js";

export type EdenErrorResponse = {
  error: ApiError;
};

export function getErrorMessage(
  errorValue: unknown,
  fallback = "An error occurred"
): string {
  if (typeof errorValue === "string") return errorValue;

  if (
    errorValue &&
    typeof errorValue === "object" &&
    "error" in errorValue
  ) {
    const { error } = errorValue as EdenErrorResponse;
    return error?.message || fallback;
  }

  return fallback;
}
