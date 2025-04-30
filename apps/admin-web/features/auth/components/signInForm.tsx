import { Button } from "@lynkeer/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lynkeer/ui/components/card";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import Link from "next/link";

import { InputPassword } from "@/features/auth/components/inputPassword";

export function SignInForm() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Inicia sesión</CardTitle>
        <CardDescription>Ingresa tus datos para iniciar sesión en tu cuenta</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>

              <div className="grid gap-2">
                <InputPassword />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
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
