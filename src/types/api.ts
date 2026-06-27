export interface StatsResponse {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
}

export interface ApiError {
  error: string;
}
