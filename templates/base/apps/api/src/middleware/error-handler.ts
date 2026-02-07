import { Elysia } from "elysia";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

const isDevelopment = process.env.NODE_ENV !== "production";

export const errorHandler = new Elysia({ name: "error-handler" }).onError(
  ({ error, code, request, set }) => {
    const method = request.method;
    const url = new URL(request.url);
    const path = url.pathname;

    if (error instanceof AppError) {
      logger.warn(
        {
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
          method,
          path,
        },
        `Application error: ${error.code}`,
      );

      set.status = error.statusCode;
      return error.toJSON();
    }

    if (code === "VALIDATION") {
      logger.warn(
        {
          error: {
            message: error.message,
            validator: error.validator,
          },
          method,
          path,
        },
        "Validation error",
      );

      set.status = 400;
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
        },
      };
    }

    const isErrorObject = error instanceof Error;
    logger.error(
      {
        error: {
          name: isErrorObject ? error.name : "UnknownError",
          message: isErrorObject ? error.message : String(error),
          stack: isDevelopment && isErrorObject ? error.stack : undefined,
        },
        method,
        path,
        code,
      },
      "Unexpected error",
    );

    set.status = 500;
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: isDevelopment && isErrorObject
          ? error.message
          : "An unexpected error occurred",
      },
    };
  },
);
