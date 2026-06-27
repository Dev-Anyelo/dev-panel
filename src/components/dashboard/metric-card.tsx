import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  description: string;
  icon: LucideIcon;
  index: number;
  label: string;
  value: number;
};

export function MetricCard({
  description,
  icon: Icon,
  index,
  label,
  value,
}: MetricCardProps) {
  return (
    <article
      className={`stat-card animate-fade-up stagger-${index + 1} flex items-start justify-between border-b-2 border-primary/30`}
    >
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="metric-value text-3xl">{value.toLocaleString("es-PA")}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
        <Icon className="size-[22px]" />
      </div>
    </article>
  );
}
