import { Elysia } from "elysia";
import { authHandler } from "@/handlers/auth";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .get("/me", async ({ request: { headers }, set }) => {
    const result = await authHandler.getMe(headers);
    if (!result.success) {
      set.status = 401;
    }
    return result;
  })

  .get("/session", async ({ request: { headers }, set }) => {
    const result = await authHandler.getSession(headers);
    if (!result.authenticated) {
      set.status = 401;
    }
    return result;
  });
