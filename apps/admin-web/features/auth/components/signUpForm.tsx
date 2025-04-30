import { Button } from "@lynkeer/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lynkeer/ui/components/card";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import { PhoneInput } from "@lynkeer/ui/components/phoneInput";
import Link from "next/link";

import { InputPassword } from "@/features/auth/components/inputPassword";

export function SignUpForm() {
  return (
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
                <InputPassword />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
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
