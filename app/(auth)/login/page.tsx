"use client";

import { Eye, EyeOff, Shield, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/components/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();
  const [email, setEmail] = useState("admin@devpanel.com");
  const [password, setPassword] = useState("admin123");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [isLoading, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Credenciales invalidas. Revisa tu email y contrasena.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--surface-base)] px-4 py-8">
      <Card className="w-full max-w-md rounded-xl border-[var(--surface-border)] bg-[var(--surface-card)] p-4 shadow-2xl shadow-black/20 sm:p-8">
        <CardHeader className="px-0 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--brand)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] text-[var(--brand-light)]">
            <Shield />
          </div>
          <CardTitle className="font-display text-3xl font-bold tracking-normal text-[var(--brand)]">
            DevPanel
          </CardTitle>
          <CardDescription className="font-sans text-muted-foreground">
            Inicia sesion en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Contrasena</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="pr-11"
                    required
                  />
                  <div className="absolute inset-y-0 right-1 z-20 flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          title={
                            isPasswordVisible
                              ? "Ocultar contrasena"
                              : "Mostrar contrasena"
                          }
                          onClick={() =>
                            setIsPasswordVisible((currentValue) => !currentValue)
                          }
                        >
                          {isPasswordVisible ? <EyeOff /> : <Eye />}
                          <span className="sr-only">
                            {isPasswordVisible
                              ? "Ocultar contrasena"
                              : "Mostrar contrasena"}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isPasswordVisible
                          ? "Ocultar contrasena"
                          : "Mostrar contrasena"}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {error ? (
                <Alert variant="destructive">
                  <TriangleAlert />
                  <AlertTitle>No pudimos iniciar sesion</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full bg-[var(--brand)] text-[#08110d] hover:bg-[var(--brand-dark)]"
              >
                {isSubmitting ? (
                  <Spinner variant="bars" data-icon="inline-start" />
                ) : null}
                {isSubmitting ? "Iniciando..." : "Iniciar sesion"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
