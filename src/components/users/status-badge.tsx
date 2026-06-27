import type { Status } from "@/types/user";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: Status }) {
  const className =
    status === "ACTIVE"
      ? "border-success/20 bg-success/15 text-[#34b27b]"
      : status === "INACTIVE"
        ? "border-warning/20 bg-warning/15 text-[#f59e0b]"
        : "border-danger/20 bg-danger/15 text-[#ef4444]";

  return (
    <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`} variant="outline">
      {status}
    </Badge>
  );
}
