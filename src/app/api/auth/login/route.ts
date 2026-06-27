import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import {
  getAuthCookieOptions,
  AUTH_COOKIE_NAME,
  signAuthToken,
} from "@/lib/auth";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().trim().email("Email invalido"),
  password: z.string().min(1, "La contrasena es requerida"),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos de login invalidos." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Credenciales invalidas." },
      { status: 401 },
    );
  }

  const isValidPassword = await bcrypt.compare(
    parsed.data.password,
    user.password,
  );

  if (!isValidPassword) {
    return NextResponse.json(
      { error: "Credenciales invalidas." },
      { status: 401 },
    );
  }

  const token = signAuthToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });

  response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return response;
}
