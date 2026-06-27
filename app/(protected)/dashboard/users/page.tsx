"use client";

import type { Role, Status } from "@prisma/client";
import { Clipboard, MoreHorizontal, Search, UserRound, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/components/providers/auth-provider";
import { useDebounce } from "@/hooks/use-debounce";
import type { UserRow, UsersResponse } from "@/types/dashboard";

const roleOptions = ["ADMIN", "USER", "MODERATOR"] as const satisfies Role[];
const statusOptions = [
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
] as const satisfies Status[];

const roleBadgeVariant: Record<Role, "brand" | "info" | "neutral"> = {
  ADMIN: "brand",
  MODERATOR: "info",
  USER: "neutral",
};

const statusBadgeVariant: Record<
  Status,
  "success" | "warning" | "danger"
> = {
  ACTIVE: "success",
  INACTIVE: "warning",
  SUSPENDED: "danger",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-PA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function UsersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="size-8 rounded-lg" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function UserDetailSheet({
  user,
  onOpenChange,
}: {
  user: UserRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  async function copyUserId(): Promise<void> {
    if (!user) {
      return;
    }

    await navigator.clipboard.writeText(user.id);
    toast.success("ID copiado al portapapeles");
  }

  return (
    <Sheet open={Boolean(user)} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-[var(--surface-border)] bg-[var(--surface-card)] sm:max-w-md">
        {user ? (
          <>
            <SheetHeader>
              <SheetTitle className="font-display">Detalle de usuario</SheetTitle>
              <SheetDescription>
                Informacion principal de la cuenta seleccionada.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 border border-[var(--surface-border)]">
                  <AvatarFallback className="bg-[var(--brand)] font-display text-xl font-semibold text-[#08110d]">
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
                <Badge variant={roleBadgeVariant[user.role]}>{user.role}</Badge>
                <Badge variant={statusBadgeVariant[user.status]}>
                  {user.status}
                </Badge>
              </div>

              <div className="grid gap-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Fecha de registro
                  </p>
                  <p className="font-mono text-sm">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ID de usuario</p>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="min-w-0 flex-1 truncate rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 py-2 font-mono text-xs">
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
                          <Clipboard />
                          <span className="sr-only">Copiar ID</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copiar ID</TooltipContent>
                    </Tooltip>
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

export default function UsersPage() {
  const { handleUnauthorized } = useAuth();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<Role | "ALL">("ALL");
  const [status, setStatus] = useState<Status | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<UsersResponse | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 300);

  const hasFilters = Boolean(search.trim()) || role !== "ALL" || status !== "ALL";

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
    });

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    if (role !== "ALL") {
      params.set("role", role);
    }

    if (status !== "ALL") {
      params.set("status", status);
    }

    return params.toString();
  }, [debouncedSearch, page, role, status]);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers(): Promise<void> {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/users?${queryString}`, {
          credentials: "include",
          cache: "no-store",
        });

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!response.ok) {
          throw new Error("Users request failed.");
        }

        const nextData = (await response.json()) as UsersResponse;

        if (isMounted) {
          setData(nextData);
        }
      } catch {
        toast.error("Error de conexion. Intenta de nuevo");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, [handleUnauthorized, queryString]);

  const users = data?.users ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;
  const rangeStart = total === 0 ? 0 : (page - 1) * 10 + 1;
  const rangeEnd = Math.min(page * 10, total);
  const isInitialLoading = isLoading && !data;

  function clearFilters(): void {
    setSearch("");
    setRole("ALL");
    setStatus("ALL");
    setPage(1);
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-semibold tracking-normal">
          Usuarios
        </h2>
        <p className="text-sm text-muted-foreground">
          Busca, filtra y revisa el detalle de cada cuenta.
        </p>
      </div>

      <Card className="border-[var(--surface-border)] bg-[var(--surface-card)]">
        <CardHeader>
          <CardTitle className="font-display">Directorio</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nombre o email"
                className="pl-9"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Select
                value={role}
                onValueChange={(value) => {
                  setRole(value as Role | "ALL");
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full bg-[var(--surface-input)] sm:w-44">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">Todos los roles</SelectItem>
                    {roleOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value as Status | "ALL");
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full bg-[var(--surface-input)] sm:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">Todos los estados</SelectItem>
                    {statusOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {hasFilters ? (
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              ) : null}
            </div>
          </div>

          {isInitialLoading ? (
            <div className="flex min-h-72 items-center justify-center rounded-xl border border-[var(--surface-border)] bg-[var(--surface-elevated)]">
              <Spinner
                variant="bars"
                className="text-[var(--brand)]"
                aria-label="Cargando usuarios"
              />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[var(--surface-border)]">
              <Table className="min-w-[760px]">
                <TableHeader>
                  <TableRow className="bg-[var(--surface-elevated)]">
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de registro</TableHead>
                    <TableHead className="w-12 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? <UsersTableSkeleton /> : null}
                  {!isLoading && users.length > 0
                    ? users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex min-w-64 items-center gap-3">
                              <Avatar className="size-10 border border-[var(--surface-border)]">
                                <AvatarFallback className="bg-[var(--brand)] font-display text-[#08110d]">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex min-w-0 flex-col">
                                <span className="truncate font-medium">
                                  {user.name}
                                </span>
                                <span className="truncate text-sm text-muted-foreground">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={roleBadgeVariant[user.role]}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusBadgeVariant[user.status]}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Abrir acciones"
                                >
                                  <MoreHorizontal />
                                  <span className="sr-only">Abrir acciones</span>
                                </Button>
                              </DropdownMenuTrigger>
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
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </div>
          )}

          {!isLoading && users.length === 0 ? (
            <Empty className="border border-[var(--surface-border)] bg-[var(--surface-elevated)]">
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
                Pagina {data?.page ?? page} de {totalPages}
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
                    aria-disabled={isLoading || page <= 1}
                    onClick={(event) => {
                      event.preventDefault();
                      if (!isLoading && page > 1) {
                        setPage((currentPage) => currentPage - 1);
                      }
                    }}
                    className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    text="Siguiente"
                    aria-disabled={isLoading || page >= totalPages}
                    onClick={(event) => {
                      event.preventDefault();
                      if (!isLoading && page < totalPages) {
                        setPage((currentPage) => currentPage + 1);
                      }
                    }}
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
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
    </section>
  );
}
