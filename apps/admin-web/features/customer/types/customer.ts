import { z } from "zod";

const customerSchema = z.object({
  firstName: z.string().min(1, "Nombre es requerido").max(50, "Nombre debe tener máximo 50 caracteres"),
  lastName: z.string().min(1, "Apellido es requerido").max(50, "Apellido debe tener máximo 50 caracteres"),
  phone: z.string().min(10, "Teléfono debe tener mínimo 10 dígitos").max(15, "Teléfono debe tener máximo 15 dígitos"),
  email: z.string().email("Email debe ser válido"),
  birthDate: z.string().min(1, "Fecha de nacimiento es requerida"),
  deviceType: z.enum(["ios", "android", "web"], { required_error: "Tipo de dispositivo es requerido" }),
  registrationMethod: z.enum(["manual", "qr_scan", "link"], { required_error: "Método de registro es requerido" }),
});
interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
}

interface CustomerResponse {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  deviceType: string;
  registrationMethod: string;
  createdAt: string;
}

interface CustomerError {
  code: string;
  message: string;
}

export { customerSchema };
export type { CreateCustomerRequest, CustomerResponse, CustomerError };
