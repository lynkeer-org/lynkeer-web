import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z
    .string({ required_error: "Número celular invalido" })
    .min(8, "Número celular debe ser mayor a 8 dígitos")
    .regex(/^\+?[0-9\s\-()]+$/, "Número celular invalido"),
  email: z.string().email("Correo electrónico invalido"),
  birthDate: z.date({ required_error: "Fecha de nacimiento requerida" }),
  terms: z.boolean({ required_error: "Debes aceptar los términos y condiciones" }),
});

type RegisterType = z.infer<typeof registerSchema>;

interface AddPassToGoogleWalletRequest {
  passUuid: string;
  data: Omit<RegisterType, "birthDate"> & { birthDate: string };
}

interface AddPassToGoogleWalletResponse {
  url: string;
}

interface AddPassToAppleWalletRequest {
  passUuid: string;
  data: Omit<RegisterType, "birthDate"> & { birthDate: string };
}

interface AddPassToAppleWalletResponse {
  binaryArray: number[];
  filename: string;
  contentType: string;
}

export { registerSchema };
export type {
  RegisterType,
  AddPassToGoogleWalletResponse,
  AddPassToGoogleWalletRequest,
  AddPassToAppleWalletRequest,
  AddPassToAppleWalletResponse,
};
