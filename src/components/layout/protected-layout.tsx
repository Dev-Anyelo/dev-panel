"use client";

import { useState, type ReactNode } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

type ProtectedLayoutProps = {
  children: ReactNode;
};

function ProtectedLayoutSkeleton() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-72 border-r border-sidebar-border bg-sidebar p-4 lg:block">
        <Skeleton className="h-10 w-36" />
        <div className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>
      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
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

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, isLoading } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (isLoading) {
    return <ProtectedLayoutSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-sidebar-border bg-sidebar lg:block">
        <AppSidebar />
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-72">
        <AppHeader onOpenNavigation={() => setIsSheetOpen(true)} />
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="left" className="w-80 border-sidebar-border bg-sidebar p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navegacion de DevPanel</SheetTitle>
            </SheetHeader>
            <AppSidebar onNavigate={() => setIsSheetOpen(false)} />
          </SheetContent>
        </Sheet>
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
