"use client";

import { AddWalletBadge } from "@/features/registerPass/components/AddWalletBadge";
import { Terms } from "@/features/registerPass/components/Terms";
import { useAddPassToAppleWallet } from "@/features/registerPass/hooks/useAddPassToAppleWallet";
import { useAddPassToGoogleWallet } from "@/features/registerPass/hooks/useAddPassToGoogleWallet";
import { registerSchema } from "@/features/registerPass/types/registerTypes";
import type { RegisterType } from "@/features/registerPass/types/registerTypes";
import { formatDateOnly } from "@/lib/utils/date";
import { detectOS } from "@/lib/utils/deviceDetection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lynkeer/ui/components/card";
import { Checkbox } from "@lynkeer/ui/components/checkbox";
import { DatePicker } from "@lynkeer/ui/components/date-picker";
import { Input } from "@lynkeer/ui/components/input";
import { Label } from "@lynkeer/ui/components/label";
import { PhoneInput } from "@lynkeer/ui/components/phoneInput";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface RegisterPassFormProps {
  passUuid: string;
}

function RegisterPassForm({ passUuid }: RegisterPassFormProps) {
  const os = detectOS();
  const [osDetected, setOsDetected] = useState<string | undefined>();
  const { mutate: addPassToGoogleWallet, isPending: isAddingPassToGoogleWallet } = useAddPassToGoogleWallet();
  const { mutate: addPassToAppleWallet, isPending: isAddingPassToAppleWallet } = useAddPassToAppleWallet();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

  useEffect(() => {
    setOsDetected(os);
  }, [os]);

  const handleDisabledDate = (date: Date) => {
    return date > new Date();
  };

  // Helper function to download Apple pass
  const downloadApplePass = (binaryArray: number[], filename: string, contentType: string) => {
    // Convert array of bytes to Uint8Array and create blob
    const bytes = new Uint8Array(binaryArray);
    const blob = new Blob([bytes], { type: contentType });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none"; // Hide the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // Helper function to download Google pass
  const downloadGooglePass = (url: string) => {
    // Create download link for Google Wallet pass
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none"; // Hide the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegister: SubmitHandler<RegisterType> = async (data) => {
    if (osDetected === "ios") {
      addPassToAppleWallet(
        {
          passUuid,
          data: {
            ...data,
            birthDate: formatDateOnly(data.birthDate),
          },
        },
        {
          onSuccess: (response) => {
            downloadApplePass(response.data.binaryArray, response.data.filename, response.data.contentType);
            toast.success("Pass descargado exitosamente");
          },
          onError: (error) => {
            console.error(error);
            toast.error("Error al agregar la tarjeta a la wallet, intenta nuevamente");
          },
        },
      );
    } else {
      addPassToGoogleWallet(
        {
          passUuid,
          data: {
            ...data,
            birthDate: formatDateOnly(data.birthDate),
          },
        },
        {
          onSuccess: (response) => {
            downloadGooglePass(response.data.url);
            toast.success("Pass descargado exitosamente");
          },
          onError: () => {
            toast.error("Error al agregar la tarjeta a la wallet, intenta nuevamente");
          },
        },
      );
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Tu tarjeta digital en segundos</CardTitle>
        <CardDescription>Completa el registro, guarda tu tarjeta, acumula sellos y recibe recompensas</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)}>
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
                  aria-invalid={Boolean(errors?.firstName)}
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
                  aria-invalid={Boolean(errors?.lastName)}
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
                  aria-invalid={Boolean(errors?.email)}
                  errorMsg={errors?.email?.message}
                  {...register("email")}
                />
              </div>

              <div className="grid gap-2">
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Fecha de nacimiento"
                      placeholder="Selecciona tu fecha de nacimiento"
                      onChange={field.onChange}
                      onDisabled={handleDisabledDate}
                      errorMsg={errors.birthDate?.message}
                    />
                  )}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex gap-2">
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="terms"
                        required
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                        aria-invalid={Boolean(errors.terms)}
                      />
                    )}
                  />
                  <Label htmlFor="terms">He leído y acepto las condiciones del servicio.</Label>
                </div>
              </div>

              <div className="grid gap-2 pt-1 justify-center">
                <button className="cursor-pointer" type="submit">
                  {isAddingPassToAppleWallet || isAddingPassToGoogleWallet ? (
                    <Loader2 className="h-12 w-15 md:h-14 animate-spin text-primary m-2" strokeWidth={1} size={24} />
                  ) : (
                    <AddWalletBadge os={osDetected} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        <Terms />
      </CardContent>
    </Card>
  );
}

export { RegisterPassForm };
