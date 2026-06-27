"use client";

import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

const bullets = [
  "Gestion centralizada de usuarios",
  "Sesiones seguras con JWT",
  "Busqueda y filtros en tiempo real",
  "Dashboard con metricas operativas",
];

export function LoginSplitPanel() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();
  const [email, setEmail] = useState("admin@devpanel.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="grid min-h-screen md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
        <section className="hidden border-r border-border bg-card p-10 md:flex md:flex-col md:justify-center">
          <div className="mx-auto max-w-md space-y-8">
            <span className="eyebrow">Panel de administracion</span>
            <div className="space-y-4">
              <ShieldCheck className="size-12 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">DevPanel</h1>
            </div>
            <div className="space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
          <div className="w-full max-w-sm space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">Bienvenido de vuelta</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Acceder
              </h2>
              <p className="text-sm text-muted-foreground">
                Continua con tu operacion sin interrupciones.
              </p>
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
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
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
                              showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                            }
                            onClick={() =>
                              setShowPassword((currentValue) => !currentValue)
                            }
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                            <span className="sr-only">
                              {showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {error ? (
                  <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle>No pudimos iniciar sesion</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-xl bg-primary text-white hover:bg-(--color-brand-dark)"
                >
                  {isSubmitting ? (
                    <Spinner variant="bars" data-icon="inline-start" />
                  ) : null}
                  {isSubmitting ? "Accediendo..." : "Acceder"}
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
