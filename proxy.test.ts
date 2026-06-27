import { describe, expect, test } from "vitest";
import { config } from "./proxy";

describe("proxy matcher", () => {
  test("targets only protected pages, protected APIs, and login", () => {
    expect(config.matcher).toEqual([
      "/dashboard/:path*",
      "/api/users/:path*",
      "/api/stats/:path*",
      "/login",
    ]);
  });
});
