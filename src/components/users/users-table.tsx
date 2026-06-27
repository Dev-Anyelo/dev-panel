"use client";

import { MoreHorizontal, UserRound, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { RoleBadge } from "@/components/users/role-badge";
import { StatusBadge } from "@/components/users/status-badge";
import { UserDetailSheet } from "@/components/users/user-detail-sheet";
import { UsersTableSkeleton } from "@/components/users/users-table-skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDate, getInitials } from "@/lib/utils";
import type { User } from "@/types/user";

type UsersTableProps = {
  isLoading: boolean;
  page: number;
  setPage: (value: number) => void;
  total: number;
  totalPages: number;
  users: User[];
};

export function UsersTable({
  isLoading,
  page,
  setPage,
  total,
  totalPages,
  users,
}: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const isInitialLoading = isLoading && users.length === 0 && total === 0;
  const { currentPage, rangeEnd, rangeStart } = useMemo(() => {
    const normalizedPage = Math.min(page, totalPages);
    return {
      currentPage: normalizedPage,
      rangeStart: total === 0 ? 0 : (normalizedPage - 1) * 10 + 1,
      rangeEnd: total === 0 ? 0 : Math.min(normalizedPage * 10, total),
    };
  }, [page, total, totalPages]);

  return (
    <>
      <Card className="section-container shadow-card">
        <CardHeader>
          <CardTitle className="font-display">Directorio</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {isInitialLoading ? (
            <div className="flex min-h-72 items-center justify-center rounded-xl border border-border bg-muted/50">
              <Spinner
                variant="bars"
                className="text-primary"
                aria-label="Cargando usuarios"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card shadow-card">
              <Table className="min-w-[760px] bg-card">
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Usuario
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Rol
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Estado
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Fecha de registro
                    </TableHead>
                    <TableHead className="w-12 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? <UsersTableSkeleton /> : null}
                  {!isLoading && users.length > 0
                    ? users.map((user) => (
                        <TableRow
                          key={user.id}
                          className="transition-colors duration-150 hover:bg-muted/30"
                        >
                          <TableCell>
                            <div className="flex min-w-64 items-center gap-3">
                              <Avatar className="size-10">
                                <AvatarFallback className="bg-primary/20 text-xs font-semibold text-primary">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex min-w-0 flex-col">
                                <span className="truncate font-medium text-foreground">
                                  {user.name}
                                </span>
                                <span className="truncate text-sm text-muted-foreground">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <RoleBadge role={user.role} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={user.status} />
                          </TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Tooltip>
                              <DropdownMenu>
                                <TooltipTrigger asChild>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      title="Ver opciones"
                                    >
                                      <MoreHorizontal />
                                      <span className="sr-only">Ver opciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem
                                      onSelect={() => setSelectedUser(user)}
                                    >
                                      <UserRound />
                                      Ver detalle
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                                <TooltipContent>Ver opciones</TooltipContent>
                              </DropdownMenu>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </div>
          )}

          {!isLoading && users.length === 0 ? (
            <Empty className="border border-border bg-muted/50">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Users />
                </EmptyMedia>
                <EmptyTitle>No se encontraron usuarios</EmptyTitle>
                <EmptyDescription>
                  Ajusta la busqueda o limpia los filtros activos.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              <p>
                Pagina {currentPage} de {totalPages}
              </p>
              <p>
                {rangeStart}-{rangeEnd} de {total} usuarios
              </p>
            </div>
            <Pagination className="mx-0 w-auto justify-start sm:justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    text="Anterior"
                    aria-disabled={isLoading || currentPage <= 1}
                    onClick={(event) => {
                      event.preventDefault();
                      if (!isLoading && currentPage > 1) {
                        setPage(currentPage - 1);
                      }
                    }}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    text="Siguiente"
                    aria-disabled={isLoading || currentPage >= totalPages}
                    onClick={(event) => {
                      event.preventDefault();
                      if (!isLoading && currentPage < totalPages) {
                        setPage(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <UserDetailSheet
        user={selectedUser}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null);
          }
        }}
      />
    </>
  );
}
