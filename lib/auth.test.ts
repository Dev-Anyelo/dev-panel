import { describe, expect, test } from "vitest";
import { signAuthToken, verifyAuthToken } from "./auth";

describe("auth token helpers", () => {
  const originalSecret = process.env.JWT_SECRET;

  test("signs and verifies the expected auth payload", () => {
    process.env.JWT_SECRET = "test-secret";

    const token = signAuthToken({
      userId: "user_123",
      email: "admin@devpanel.com",
      role: "ADMIN",
    });

    expect(verifyAuthToken(token)).toMatchObject({
      userId: "user_123",
      email: "admin@devpanel.com",
      role: "ADMIN",
    });

    process.env.JWT_SECRET = originalSecret;
  });

  test("returns null for invalid tokens", () => {
    process.env.JWT_SECRET = "test-secret";

    expect(verifyAuthToken("not-a-real-token")).toBeNull();

    process.env.JWT_SECRET = originalSecret;
  });
});
