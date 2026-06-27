"use client";

import { ShieldCheck, Sparkles, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/providers/auth-provider";
import type { StatsResponse, UserRow, UsersResponse } from "@/types/dashboard";

const statCards = [
  {
    label: "Total usuarios",
    description: "Usuarios registrados",
    key: "totalUsers",
    icon: Users,
  },
  {
    label: "Usuarios activos",
    description: "Estado ACTIVE",
    key: "activeUsers",
    icon: UserCheck,
  },
  {
    label: "Administradores",
    description: "Rol ADMIN",
    key: "adminUsers",
    icon: ShieldCheck,
  },
  {
    label: "Nuevos este mes",
    description: "Creados desde el dia 1",
    key: "newUsersThisMonth",
    icon: Sparkles,
  },
] as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-PA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function DashboardPage() {
  const { handleUnauthorized } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [recentUsers, setRecentUsers] = useState<UserRow[]>([]);
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

        if (isMounted) {
          setStats(statsData);
          setIsStatsLoading(false);
        }

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

        const usersData = (await usersResponse.json()) as UsersResponse;

        if (isMounted) {
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

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-normal">
          Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Resumen operativo de usuarios y actividad reciente.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats?.[card.key] ?? 0;

          return (
            <Card
              key={card.key}
              className="border-[var(--surface-border)] bg-[var(--surface-card)]"
            >
              <CardHeader>
                <CardTitle className="font-sans text-sm text-muted-foreground">
                  {card.label}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <CardAction className="rounded-xl border border-[color-mix(in_srgb,var(--brand)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] p-2 text-[var(--brand)]">
                  <Icon />
                </CardAction>
              </CardHeader>
              <CardContent>
                {isStatsLoading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <p className="font-display text-3xl font-semibold tracking-normal">
                    {value.toLocaleString("es-PA")}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-[var(--surface-border)] bg-[var(--surface-card)]">
        <CardHeader>
          <CardTitle className="font-display text-lg">Actividad reciente</CardTitle>
          <CardDescription>Ultimos usuarios registrados.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isActivityLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))
            : recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 border border-[var(--surface-border)]">
                      <AvatarFallback className="bg-[var(--brand)] font-display text-[#08110d]">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <time className="shrink-0 font-mono text-xs text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </time>
                </div>
              ))}
        </CardContent>
      </Card>
    </section>
  );
}
