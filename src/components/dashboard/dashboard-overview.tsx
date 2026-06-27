"use client";

import { ShieldCheck, Sparkles, UserCheck, Users } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { MetricCardSkeleton } from "@/components/dashboard/metric-card-skeleton";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { useDashboard } from "@/hooks/use-dashboard";

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

export function DashboardOverview() {
  const { stats, recentUsers, isStatsLoading, isActivityLoading } = useDashboard();

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen operativo de usuarios y actividad reciente.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) =>
          isStatsLoading ? (
            <MetricCardSkeleton key={card.key} index={index} />
          ) : (
            <MetricCard
              key={card.key}
              description={card.description}
              icon={card.icon}
              index={index}
              label={card.label}
              value={stats?.[card.key] ?? 0}
            />
          ),
        )}
      </div>

      <RecentActivity isLoading={isActivityLoading} users={recentUsers} />
    </section>
  );
}
