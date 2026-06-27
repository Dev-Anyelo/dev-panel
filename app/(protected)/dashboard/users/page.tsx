"use client";

import type { Role, Status } from "@prisma/client";
import { Search, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/components/providers/auth-provider";
import { useDebounce } from "@/hooks/use-debounce";
import type { UsersResponse } from "@/types/dashboard";

const roleOptions = ["ADMIN", "MODERATOR", "USER"] as const satisfies Role[];
const statusOptions = [
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
] as const satisfies Status[];

const roleBadgeVariant: Record<Role, "default" | "secondary" | "outline"> = {
  ADMIN: "default",
  MODERATOR: "secondary",
  USER: "outline",
};

const statusBadgeVariant: Record<
  Status,
  "default" | "secondary" | "destructive"
> = {
  ACTIVE: "default",
  INACTIVE: "secondary",
  SUSPENDED: "destructive",
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
    dateStyle: "medium",
  }).format(new Date(value));
}

function UsersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-44" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-28" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function UsersPage() {
  const { handleUnauthorized } = useAuth();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<Role | "ALL">("ALL");
  const [status, setStatus] = useState<Status | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<UsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 300);

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

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-normal">Usuarios</h2>
        <p className="text-sm text-muted-foreground">
          Administra busqueda, filtros y paginacion.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directorio</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nombre o email"
                className="pl-8"
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
                <SelectTrigger className="w-full sm:w-40">
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
                <SelectTrigger className="w-full sm:w-44">
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
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Creado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <UsersTableSkeleton /> : null}
                {!isLoading && users.length > 0
                  ? users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex min-w-48 items-center gap-3">
                            <Avatar className="size-9">
                              <AvatarFallback>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
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
                        <TableCell className="text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>

          {!isLoading && users.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UsersRound />
                </EmptyMedia>
                <EmptyTitle>No hay resultados</EmptyTitle>
                <EmptyDescription>
                  Ajusta la busqueda o los filtros activos.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Pagina {data?.page ?? page} de {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={isLoading || page <= 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={isLoading || page >= totalPages}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
