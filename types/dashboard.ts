import type { Role, Status } from "@prisma/client";

export type StatsResponse = {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
};

export type UserRow = {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: Status;
  createdAt: string;
};

export type UsersResponse = {
  users: UserRow[];
  total: number;
  page: number;
  totalPages: number;
};
