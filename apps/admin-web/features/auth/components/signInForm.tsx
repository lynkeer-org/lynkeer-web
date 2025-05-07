"use client";

import { signInSchema } from "@/features/auth/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@lynkeer/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lynkeer/ui/components/card";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";

import { InputPassword } from "@/features/auth/components/inputPassword";

import type { SignInType } from "@/features/auth/types/auth";
import type { SubmitHandler } from "react-hook-form";

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInType>({ resolver: zodResolver(signInSchema) });

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (errorParam && hasHydrated) {
      toast.warning("Cuenta creada, pero hubo un problema al iniciar sesión. Por favor, inicia sesión manualmente.");
    }
  }, [errorParam, hasHydrated]);

  const handleSignIn: SubmitHandler<SignInType> = async (data) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response.ok) {
        router.replace("/");
      } else {
        toast.error("Correo o contraseña incorrectos. Intenta de nuevo.");
      }
    } catch (_error) {
      toast.error("Correo o contraseña incorrectos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Inicia sesión</CardTitle>
        <CardDescription>Ingresa tus datos para iniciar sesión en tu cuenta</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
              </div>

              <div className="grid gap-2">
                <InputPassword aria-invalid={Boolean(errors.password)} {...register("password")} />
              </div>

              <Button type="submit" className="w-full cursor-pointer" loading={loading}>
                Inicia sesión
              </Button>
            </div>
            <div className="text-center text-sm">
              ¿Aún no tienes cuenta?{" "}
              <Link href="/auth/sign-up" className="hover:text-primary underline underline-offset-4">
                Crea una
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
