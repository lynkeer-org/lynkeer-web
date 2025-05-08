import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

const ownerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z
    .string({ required_error: "Número celular invalido" })
    .min(8, "Número celular debe ser mayor a 8 dígitos")
    .regex(/^\+?[0-9\s\-()]+$/, "Número celular invalido"),
  email: z.string().email("Correo electrónico invalido"),
  password: z.string().min(4, "Contraseña debe tener al menos 4 caracteres").max(100),
});
type OwnerType = z.infer<typeof ownerSchema>;

const signInSchema = ownerSchema.pick({ email: true, password: true });
type SignInType = z.infer<typeof signInSchema>;

interface UserType extends Pick<OwnerType, "firstName" | "email"> {
  id: string;
  accessToken: string;
}

export { ownerSchema, signInSchema };
export type { OwnerType, SignInType, UserType };
