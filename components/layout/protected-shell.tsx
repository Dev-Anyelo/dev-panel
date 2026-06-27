"use client";

import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeft,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

type ProtectedShellProps = {
  children: ReactNode;
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/users",
    label: "Usuarios",
    icon: Users,
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

function useSectionTitle(pathname: string): string {
  return useMemo(() => {
    if (pathname.startsWith("/dashboard/users")) {
      return "Usuarios";
    }

    return "Dashboard";
  }, [pathname]);
}

function UserMenu({ compact = false }: { compact?: boolean }) {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-11 justify-start gap-3 rounded-xl px-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
            compact ? "w-full" : "w-auto",
          )}
          title="Abrir menu de usuario"
        >
          <Avatar className="size-9 border border-[var(--surface-border)]">
            <AvatarFallback className="bg-[var(--brand)] font-display text-sm font-semibold text-[#08110d]">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className={cn("min-w-0 flex-col text-left", compact ? "flex" : "hidden sm:flex")}>
            <span className="truncate text-sm font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate">{user.name}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => void logout()}>
            <LogOut />
            Cerrar sesion
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-[var(--surface-card)] text-foreground">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--brand)] text-[#08110d]">
          <Shield />
        </div>
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="font-display text-lg font-bold tracking-normal text-[var(--brand-light)]"
        >
          DevPanel
        </Link>
      </div>

      <Separator className="bg-[var(--surface-border)]" />

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "h-10 justify-start gap-3 rounded-xl px-3 text-muted-foreground transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
                isActive &&
                  "bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-[var(--brand-light)] hover:text-[var(--brand-light)]",
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

      <div className="p-4">
        <div className="mb-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-3">
          <div className="flex items-center gap-2 text-sm">
            <BarChart3 className="text-[var(--brand)]" />
            <span className="font-medium">Panel operativo</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Usuarios, actividad y metricas clave.
          </p>
        </div>
        <UserMenu compact />
      </div>
    </div>
  );
}

function ShellLoading() {
  return (
    <div className="flex min-h-screen bg-[var(--surface-base)]">
      <aside className="hidden w-72 border-r border-[var(--surface-border)] bg-[var(--surface-card)] p-4 lg:block">
        <Skeleton className="h-10 w-36" />
        <div className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>
      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[var(--surface-border)] bg-[var(--surface-card)] px-4 lg:px-6">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="size-9 rounded-full" />
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      </main>
    </div>
  );
}

export function ProtectedShell({ children }: ProtectedShellProps) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const title = useSectionTitle(pathname);

  if (isLoading) {
    return <ShellLoading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-[var(--surface-border)] bg-[var(--surface-card)] lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-72">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[var(--surface-border)] bg-[var(--surface-card)] px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  title="Abrir navegacion"
                >
                  <Menu />
                  <span className="sr-only">Abrir navegacion</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 border-[var(--surface-border)] bg-[var(--surface-card)] p-0"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Navegacion de DevPanel</SheetTitle>
                </SheetHeader>
                <SidebarContent onNavigate={() => setIsSheetOpen(false)} />
              </SheetContent>
            </Sheet>

            <PanelLeft className="hidden text-muted-foreground lg:block" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-display text-base font-semibold">
                    {title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <UserMenu />
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
