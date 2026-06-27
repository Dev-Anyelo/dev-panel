import type { Role, Status } from "@prisma/client";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: Status;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
