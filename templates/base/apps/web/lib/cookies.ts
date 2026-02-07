"use server";

import { cookies } from "next/headers";

export async function setResponseCookies(response: Response): Promise<void> {
  const setCookieHeaders = response.headers.getSetCookie();

  if (!setCookieHeaders || setCookieHeaders.length === 0) {
    return;
  }

  const cookieStore = await cookies();

  for (const cookieString of setCookieHeaders) {
    const [nameValue, ...attributes] = cookieString.split(";");
    if (!nameValue) continue;

    const eqIndex = nameValue.indexOf("=");
    if (eqIndex === -1) continue;

    const cookieName = nameValue.substring(0, eqIndex).trim();
    const rawValue = nameValue.substring(eqIndex + 1).trim();
    const cookieValue = decodeURIComponent(rawValue);

    if (!cookieName) continue;

    const attrMap: Record<string, string | boolean> = {};
    for (const attr of attributes) {
      const [key, val] = attr.split("=").map((s) => s.trim());
      if (key) {
        attrMap[key.toLowerCase()] = val ?? true;
      }
    }

    cookieStore.set(cookieName, cookieValue, {
      httpOnly: "httponly" in attrMap,
      secure: "secure" in attrMap || process.env.NODE_ENV === "production",
      sameSite: (attrMap["samesite"] as "lax" | "strict" | "none") || "lax",
      path: (attrMap["path"] as string) || "/",
    });
  }
}
