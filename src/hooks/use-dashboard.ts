"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import type { StatsResponse } from "@/types/api";
import type { PaginatedUsers, User } from "@/types/user";

type DashboardState = {
  stats: StatsResponse | null;
  recentUsers: User[];
  isStatsLoading: boolean;
  isActivityLoading: boolean;
};

export function useDashboard(): DashboardState {
  const { handleUnauthorized } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isActivityLoading, setIsActivityLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard(): Promise<void> {
      setIsStatsLoading(true);
      setIsActivityLoading(true);

      try {
        const statsResponse = await fetch("/api/stats", {
          credentials: "include",
          cache: "no-store",
        });

        if (statsResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!statsResponse.ok) {
          throw new Error("Stats request failed.");
        }

        const statsData = (await statsResponse.json()) as StatsResponse;

        const usersResponse = await fetch("/api/users?page=1&limit=5", {
          credentials: "include",
          cache: "no-store",
        });

        if (usersResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!usersResponse.ok) {
          throw new Error("Users request failed.");
        }

        const usersData = (await usersResponse.json()) as PaginatedUsers;

        if (isMounted) {
          setStats(statsData);
          setRecentUsers(usersData.users);
        }
      } catch {
        toast.error("Error de conexion. Intenta de nuevo");
      } finally {
        if (isMounted) {
          setIsStatsLoading(false);
          setIsActivityLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [handleUnauthorized]);

  return { stats, recentUsers, isStatsLoading, isActivityLoading };
}
