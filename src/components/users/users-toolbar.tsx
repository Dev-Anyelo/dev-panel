"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roleOptions = ["ADMIN", "USER", "MODERATOR"] as const;
const statusOptions = ["ACTIVE", "INACTIVE", "SUSPENDED"] as const;

type UsersToolbarProps = {
  clearFilters: () => void;
  hasActiveFilters: boolean;
  role: string;
  search: string;
  setRole: (value: string) => void;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  status: string;
};

export function UsersToolbar({
  clearFilters,
  hasActiveFilters,
  role,
  search,
  setRole,
  setSearch,
  setStatus,
  status,
}: UsersToolbarProps) {
  return (
    <div className="toolbar">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o email"
          className="pl-9"
        />
      </div>

      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-full sm:w-44">
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

      <Select value={status} onValueChange={setStatus}>
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

      {hasActiveFilters ? (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="bg-muted text-sm text-muted-foreground hover:bg-muted/80"
        >
          <X data-icon="inline-start" />
          Limpiar
        </Button>
      ) : null}
    </div>
  );
}
