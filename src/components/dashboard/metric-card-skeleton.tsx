import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton({ index }: { index: number }) {
  return (
    <div className={`stat-card animate-fade-up stagger-${index + 1} flex justify-between border-b-2 border-primary/30`}>
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Skeleton className="size-12 rounded-xl" />
    </div>
  );
}
