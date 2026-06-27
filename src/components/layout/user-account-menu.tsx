"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getInitials, cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

type UserAccountMenuProps = {
  compact?: boolean;
};

export function UserAccountMenu({ compact = false }: UserAccountMenuProps) {
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
            "h-11 justify-start gap-3 rounded-xl px-2 text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            compact ? "w-full" : "w-auto",
          )}
          title="Abrir menu de usuario"
        >
          <Avatar className="size-9 border border-border">
            <AvatarFallback className="bg-primary/20 font-display text-sm font-semibold text-primary">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "min-w-0 flex-col text-left",
              compact ? "flex" : "hidden sm:flex",
            )}
          >
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
