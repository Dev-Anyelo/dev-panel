export type Role = "ADMIN" | "USER" | "MODERATOR";

export type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: string;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}
