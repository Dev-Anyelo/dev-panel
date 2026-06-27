"use client";

import { ShieldCheck, Sparkles, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
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
import type { StatsResponse } from "@/types/dashboard";

const statCards = [
  {
    label: "Total de usuarios",
    description: "Usuarios registrados",
    key: "totalUsers",
    icon: Users,
  },
  {
    label: "Usuarios activos",
    description: "Con estado ACTIVE",
    key: "activeUsers",
    icon: UserCheck,
  },
  {
    label: "Administradores",
    description: "Cuentas con rol ADMIN",
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

export default function DashboardPage() {
  const { handleUnauthorized } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats(): Promise<void> {
      setIsLoading(true);

      try {
        const response = await fetch("/api/stats", {
          credentials: "include",
          cache: "no-store",
        });

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!response.ok) {
          throw new Error("Stats request failed.");
        }

        const data = (await response.json()) as StatsResponse;

        if (isMounted) {
          setStats(data);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      isMounted = false;
    };
  }, [handleUnauthorized]);

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Resumen operativo de usuarios.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats?.[card.key] ?? 0;

          return (
            <Card key={card.key}>
              <CardHeader>
                <CardTitle>{card.label}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <CardAction className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <Icon />
                </CardAction>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <p className="text-3xl font-semibold tracking-normal">
                    {value.toLocaleString("es-PA")}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
