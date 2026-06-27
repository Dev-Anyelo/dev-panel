"use client";

import { useUsers } from "@/hooks/use-users";
import { UsersTable } from "@/components/users/users-table";
import { UsersToolbar } from "@/components/users/users-toolbar";

export default function UsersPage() {
  const usersState = useUsers();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
        <p className="text-sm text-muted-foreground">
          Busca, filtra y revisa el detalle de cada cuenta.
        </p>
      </div>

      <UsersToolbar {...usersState} />
      <UsersTable
        isLoading={usersState.isLoading}
        page={usersState.page}
        setPage={usersState.setPage}
        total={usersState.total}
        totalPages={usersState.totalPages}
        users={usersState.users}
      />
    </section>
  );
}
