import type { Role } from "@/types/user";
import { Badge } from "@/components/ui/badge";

export function RoleBadge({ role }: { role: Role }) {
  const className =
    role === "ADMIN"
      ? "border-primary/20 bg-primary/15 text-primary"
      : role === "MODERATOR"
        ? "border-info/20 bg-info/15 text-[#3b82f6]"
        : "border-border bg-muted text-muted-foreground";

  return (
    <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`} variant="outline">
      {role}
    </Badge>
  );
}
