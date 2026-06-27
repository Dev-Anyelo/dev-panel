import type { Role } from "@prisma/client";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const AUTH_COOKIE_NAME = "token";
export const AUTH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24;

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: Role;
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return secret;
}

function isAuthTokenPayload(payload: string | JwtPayload): payload is JwtPayload &
  AuthTokenPayload {
  return (
    typeof payload !== "string" &&
    typeof payload.userId === "string" &&
    typeof payload.email === "string" &&
    ["ADMIN", "USER", "MODERATOR"].includes(String(payload.role))
  );
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: AUTH_TOKEN_MAX_AGE_SECONDS,
  });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    const payload = jwt.verify(token, getJwtSecret());

    if (!isAuthTokenPayload(payload)) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export function getAuthCookieOptions(): {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AUTH_TOKEN_MAX_AGE_SECONDS,
  };
}
