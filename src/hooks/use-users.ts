"use client";

import { useEffect, useMemo, useState } from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import type { PaginatedUsers, User } from "@/types/user";

type UseUsersResult = {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  setPage: (value: number) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
};

export function useUsers(): UseUsersResult {
  const { handleUnauthorized } = useAuth();
  const [search, setSearchParam] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: false,
      throttleMs: 300,
    }),
  );
  const [role, setRoleParam] = useQueryState(
    "role",
    parseAsString.withDefault("ALL").withOptions({ shallow: false }),
  );
  const [status, setStatusParam] = useQueryState(
    "status",
    parseAsString.withDefault("ALL").withOptions({ shallow: false }),
  );
  const [page, setPageParam] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );
  const [data, setData] = useState<PaginatedUsers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasActiveFilters = search !== "" || role !== "ALL" || status !== "ALL";

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
    });

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (role !== "ALL") {
      params.set("role", role);
    }

    if (status !== "ALL") {
      params.set("status", status);
    }

    return params.toString();
  }, [page, role, search, status]);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers(): Promise<void> {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/users?${queryString}`, {
          credentials: "include",
          cache: "no-store",
        });

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!response.ok) {
          throw new Error("Users request failed.");
        }

        const nextData = (await response.json()) as PaginatedUsers;

        if (isMounted) {
          setData(nextData);
          if (nextData.totalPages > 0 && page > nextData.totalPages) {
            void setPageParam(nextData.totalPages === 1 ? null : nextData.totalPages);
          }
        }
      } catch {
        toast.error("Error de conexion. Intenta de nuevo");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, [handleUnauthorized, page, queryString, setPageParam]);

  function setSearch(value: string): void {
    void setSearchParam(value);
    void setPageParam(1);
  }

  function setRole(value: string): void {
    void setRoleParam(value);
    void setPageParam(1);
  }

  function setStatus(value: string): void {
    void setStatusParam(value);
    void setPageParam(1);
  }

  function setPage(value: number): void {
    void setPageParam(value === 1 ? null : value);
  }

  function clearFilters(): void {
    void setSearchParam(null);
    void setRoleParam(null);
    void setStatusParam(null);
    void setPageParam(null);
  }

  return {
    users: data?.users ?? [],
    total: data?.total ?? 0,
    page: Math.min(page, data?.totalPages ?? 1),
    totalPages: data?.totalPages ?? 1,
    isLoading,
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
    setPage,
    clearFilters,
    hasActiveFilters,
  };
}
