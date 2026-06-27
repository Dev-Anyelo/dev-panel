"use client";

import { Menu, PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserAccountMenu } from "@/components/layout/user-account-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

type AppHeaderProps = {
  onOpenNavigation: () => void;
};

function getSectionTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/users")) {
    return "Usuarios";
  }

  return "Dashboard";
}

export function AppHeader({ onOpenNavigation }: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          title="Abrir navegacion"
          onClick={onOpenNavigation}
        >
          <Menu />
          <span className="sr-only">Abrir navegacion</span>
        </Button>
        <PanelLeft className="hidden text-muted-foreground lg:block" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-display text-base font-semibold">
                {getSectionTitle(pathname)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <UserAccountMenu />
    </header>
  );
}
