"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@lynkeer/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lynkeer/ui/components/card";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import { PhoneInput } from "@lynkeer/ui/components/phoneInput";

import { signUpAction } from "@/app/auth/actions/signUp";
import { InputPassword } from "@/features/auth/components/InputPassword_v2";
import { ownerSchema } from "@/features/auth/types/auth";

import { errorTypes } from "@/features/auth/lib/errorTypes";
import type { OwnerType } from "@/features/auth/types/auth";
import type { SubmitHandler } from "react-hook-form";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<OwnerType>({ resolver: zodResolver(ownerSchema) });

  const handleSignUp: SubmitHandler<OwnerType> = async (data) => {
    setLoading(true);
    const response = await signUpAction(data);

    if (response?.error) {
      if (response.error.code === errorTypes.SIGN_IN_ERROR) {
        router.replace("/auth/sign-in?error=true");
      }

      if (response.error.code === errorTypes.SIGN_UP_ERROR) {
        toast.error("No fue posible crear la cuenta. Por favor, intenta de nuevo.");
      }
    } else {
      router.replace("/");
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Crear cuenta</CardTitle>
        <CardDescription>Ingresa tus datos para registrarte en el portal</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  maxLength={50}
                  required
                  aria-invalid={Boolean(errors.firstName)}
                  {...register("firstName")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  maxLength={50}
                  required
                  aria-invalid={Boolean(errors.lastName)}
                  {...register("lastName")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Número celular</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      inputProps={{
                        id: "phone",
                        type: "tel",
                        required: true,
                        minLength: 8,
                        "aria-invalid": Boolean(errors.phone),
                      }}
                      errorMsg={errors.phone?.message}
                    />
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                  errorMsg={errors.email?.message}
                  {...register("email")}
                />
              </div>

              <div className="grid gap-2">
                <InputPassword
                  aria-invalid={Boolean(errors.password)}
                  errorMsg={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer" loading={loading}>
                Crear cuenta
              </Button>
            </div>

            <div className="text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/sign-in" className="hover:text-primary underline underline-offset-4">
                Inicia sesión
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
