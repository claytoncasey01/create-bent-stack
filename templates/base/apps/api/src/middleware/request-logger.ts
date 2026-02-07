import { Elysia } from "elysia";
import { createChildLogger } from "@/lib/logger";

export const requestLogger = new Elysia({ name: "request-logger" })
  .derive(({ request }) => {
    const url = new URL(request.url);

    const requestId =
      request.headers.get("x-request-id") || crypto.randomUUID();

    const startTime = Date.now();

    const log = createChildLogger({
      requestId,
      method: request.method,
      path: url.pathname,
    });

    return { requestId, startTime, log };
  })
  .onBeforeHandle(({ request, log }) => {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());

    log.debug(
      {
        query: Object.keys(query).length > 0 ? query : undefined,
      },
      "Request started",
    );
  })
  .onAfterResponse(({ set, startTime, log }) => {
    const durationMs = Date.now() - startTime;

    log.info(
      {
        status: set.status,
        durationMs,
      },
      "Request completed",
    );
  });
