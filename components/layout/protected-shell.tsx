"use client";

import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
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
            variant={isActive ? "secondary" : "ghost"}
            className="justify-start"
            onClick={onNavigate}
          >
            <Link href={item.href}>
              <Icon data-icon="inline-start" />
              {item.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

function ShellLoading() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-r bg-card/60 p-4 lg:block">
        <Skeleton className="h-8 w-32" />
        <div className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </aside>
      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="size-9 rounded-full" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </main>
    </div>
  );
}

export function ProtectedShell({ children }: ProtectedShellProps) {
  const { user, isLoading, logout } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  if (isLoading) {
    return <ShellLoading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r bg-card/60 lg:block">
        <div className="flex h-full flex-col p-4">
          <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield />
            </span>
            <span className="text-lg font-semibold">DevPanel</span>
          </Link>
          <Separator className="my-4" />
          <SidebarNav />
          <div className="mt-auto rounded-lg border bg-background/60 p-3">
            <div className="flex items-center gap-2 text-sm">
              <BarChart3 className="text-muted-foreground" />
              <span className="font-medium">Admin activo</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Gestion operativa de usuarios.
            </p>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Shield />
                    </span>
                    DevPanel
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <SidebarNav onNavigate={() => setIsSheetOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <p className="text-sm text-muted-foreground">Panel</p>
              <h1 className="text-base font-semibold leading-none lg:text-lg">
                Administracion
              </h1>
            </div>
          </div>

          <Dialog
            open={isLogoutDialogOpen}
            onOpenChange={setIsLogoutDialogOpen}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 gap-2 px-2">
                  <Avatar className="size-8">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-40 truncate text-sm md:inline">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      setIsLogoutDialogOpen(true);
                    }}
                  >
                    <LogOut />
                    Cerrar sesion
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cerrar sesion</DialogTitle>
                <DialogDescription>
                  Tu sesion actual se cerrara en este navegador.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsLogoutDialogOpen(false);
                    void logout();
                  }}
                >
                  <LogOut data-icon="inline-start" />
                  Cerrar sesion
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 lg:p-6",
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
