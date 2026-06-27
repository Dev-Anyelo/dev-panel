"use client";

import { Calendar, Copy, Hash } from "lucide-react";
import { toast } from "sonner";
import { RoleBadge } from "@/components/users/role-badge";
import { StatusBadge } from "@/components/users/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate, getInitials } from "@/lib/utils";
import type { User } from "@/types/user";

type UserDetailSheetProps = {
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export function UserDetailSheet({
  onOpenChange,
  user,
}: UserDetailSheetProps) {
  async function copyUserId(): Promise<void> {
    if (!user) {
      return;
    }

    await navigator.clipboard.writeText(user.id);
    toast.success("ID copiado");
  }

  return (
    <Sheet open={Boolean(user)} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-border bg-card sm:max-w-md">
        {user ? (
          <>
            <SheetHeader>
              <SheetTitle className="font-display">Detalle de usuario</SheetTitle>
              <SheetDescription>
                Informacion principal de la cuenta seleccionada.
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-6 px-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-primary/20 font-display text-xl font-bold text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xl font-semibold">
                    {user.name}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">
                  Informacion
                </h4>
                <div className="rounded-xl border border-border bg-muted/50 p-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 size-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Fecha de registro
                      </p>
                      <p className="font-mono text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <Hash className="mt-0.5 size-4 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">ID de usuario</p>
                      <div className="mt-2 flex items-center gap-2">
                        <code className="min-w-0 flex-1 truncate rounded-lg border border-border bg-card px-3 py-2 font-mono text-xs text-foreground">
                          {user.id}
                        </code>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              title="Copiar ID"
                              onClick={() => void copyUserId()}
                            >
                              <Copy />
                              <span className="sr-only">Copiar ID</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copiar ID</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
