"use client";

import { LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAccountMenu } from "@/components/layout/user-account-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/users", label: "Usuarios", icon: Users },
] as const;

type AppSidebarProps = {
  onNavigate?: () => void;
};

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <ShieldCheck className="size-6" />
        </div>
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="font-display text-2xl font-bold text-foreground"
        >
          DevPanel
        </Link>
      </div>

      <Separator className="bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "h-11 justify-start gap-3 rounded-xl border-l-2 border-transparent px-3 text-sidebar-foreground/80 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive &&
                  "border-l-primary bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
              )}
            >
              <Link href={item.href} onClick={onNavigate}>
                <Icon data-icon="inline-start" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <UserAccountMenu compact />
      </div>
    </div>
  );
}
