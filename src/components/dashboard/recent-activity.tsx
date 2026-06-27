import { RoleBadge } from "@/components/users/role-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, getInitials } from "@/lib/utils";
import type { User } from "@/types/user";

type RecentActivityProps = {
  isLoading: boolean;
  users: User[];
};

export function RecentActivity({ isLoading, users }: RecentActivityProps) {
  return (
    <Card className="section-container shadow-card">
      <CardHeader className="space-y-2">
        <p className="eyebrow">Registro</p>
        <CardTitle className="font-display text-lg">Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 rounded-xl p-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))
          : users.map((user) => (
              <div
                key={user.id}
                className="interactive-row flex items-center justify-between gap-4 rounded-xl p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/20 text-sm font-semibold text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      <RoleBadge role={user.role} />
                    </div>
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
  );
}
