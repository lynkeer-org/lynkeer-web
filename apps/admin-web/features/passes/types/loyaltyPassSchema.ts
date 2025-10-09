import { z } from "zod";

import { regexes } from "@/features/passes/lib/regexes";
import type { PassField } from "@/features/passes/types/passFieldTypes";

const loyaltyPassSchema = z.object({
  passName: z.string().min(1).max(50),
  stampGoal: z.coerce.number().min(1, "Mínimo 1 sello").max(30, "Máximo 30 sellos"),
  logoUrl: z.string().url(),
  textColor: z.string().regex(regexes.regexColor),
  backgroundColor: z.string().regex(regexes.regexColor),
  passTypeId: z.string(),
});
type LoyaltyPassType = z.infer<typeof loyaltyPassSchema>;

interface PassTemplateType {
  title: string;
  stampGoal: string;
  logoUrl: string;
  textColor: string;
  backgroundColor: string;
  googleClassId: string;
  applePassTypeIdentifier: string;
  passFields: PassField[];
  passTypeId: string;
}

interface CreatePassTemplateResponse extends PassTemplateType {
  id: string;
}
interface GetPassTemplateResponse extends PassTemplateType {
  id: string;
  ownerId: string;
}

interface GoogleLoyaltyUserType {
  classId: string;
  customerId: string;
  name: string;
  email: string;
  urlImageStamps: string;
  stamps: number;
  rewards: number;
}

interface AppleLoyaltyUserType {
  title: string;
  customerId: string;
  urlImageStamps: string;
  stamps: number;
  rewards: number;
}

interface AppleLoyaltyPassData {
  passTypeIdentifier: string;
  serialNumber: string;
  teamIdentifier: string;
  organizationName: string;
  description: string;
  logoText: string;
  foregroundColor: string;
  backgroundColor: string;
  labelColor: string;
  webServiceURL: string;
  authenticationToken: string;
  sharingProhibited: boolean;
}

export { loyaltyPassSchema };
export type {
  LoyaltyPassType,
  PassTemplateType,
  CreatePassTemplateResponse,
  GetPassTemplateResponse,
  GoogleLoyaltyUserType,
  AppleLoyaltyUserType,
  AppleLoyaltyPassData,
};
