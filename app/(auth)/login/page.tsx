"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const highlights = [
  "Gestion de usuarios",
  "Sesiones seguras JWT",
  "Busqueda en tiempo real",
  "Dashboard operativo",
];

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
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
        <section className="hidden border-r border-border bg-card px-10 py-12 md:flex md:flex-col md:justify-between">
          <div className="space-y-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-secondary px-4 py-2">
                <ShieldCheck className="size-4 text-primary" />
                <span className="font-display text-sm font-semibold text-foreground">
                  DevPanel
                </span>
              </div>
              <div className="space-y-4">
                <p className="eyebrow">Control centralizado</p>
                <h1 className="max-w-sm text-4xl font-semibold tracking-tight text-foreground">
                  Tu panel de administracion, en un solo lugar.
                </h1>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  Supervisa usuarios, sesiones y actividad con una interfaz clara
                  para el trabajo diario del equipo.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="eyebrow">Lo que encuentras aqui</p>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-secondary p-5 shadow-card">
            <p className="text-sm font-medium text-foreground">
              Listo para trabajar
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              El acceso queda protegido con cookies HttpOnly y autenticacion JWT
              para mantener la sesion estable.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-background/80 p-6 md:border-0 md:bg-transparent md:p-10">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-card">
                    <ShieldCheck className="size-4 text-primary" />
                    <span className="font-display text-sm font-semibold text-foreground">
                      DevPanel
                    </span>
                  </div>
                  <Badge variant="brand">Panel Admin</Badge>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                    Acceder
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Inicia sesion para continuar con la administracion del panel.
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="h-12 rounded-xl pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contrasena</Label>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-12 rounded-xl pl-10 pr-12"
                        required
                      />
                      <div className="absolute inset-y-0 right-1 z-10 flex items-center">
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
                    className="h-11 w-full rounded-xl"
                  >
                    {isSubmitting ? (
                      <Spinner variant="bars" data-icon="inline-start" />
                    ) : null}
                    {isSubmitting ? "Accediendo..." : "Acceder ->"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
