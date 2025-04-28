"use client";

import { Button } from "@lynkeer/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lynkeer/ui/components/card";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import { PhoneInput } from "@lynkeer/ui/components/phoneInput";
import { cn } from "@lynkeer/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import type React from "react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((value) => !value);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crear cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para registrarte en el portal</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" type="text" placeholder="Ingresa tu nombre" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" type="text" placeholder="Ingresa tu apellido" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cellphoneNumber">Número celular</Label>
                  <PhoneInput inputProps={{ id: "cellphoneNumber", type: "tel", required: true }} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative w-full">
                    <Input id="password" type={showPassword ? "text" : "password"} required className="pr-10" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleTogglePassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground"
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                  Crear cuenta
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <a href="https://example.com" className="hover:text-primary underline underline-offset-4">
                  Inicia sesión
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al continuar, aceptas nuestros <a href="https://example.com">Términos</a> y{" "}
        <a href="https://example.com">Política de privacidad</a>.
      </div>
    </div>
  );
}
