import { z } from "zod";

import { regexes } from "@/features/passes/lib/regexes";
import type { PassField } from "@/features/passes/types/passFieldTypes";

const loyaltyPassSchema = z.object({
  passName: z.string().min(1).max(50),
  stampGoal: z.string({ message: "" }).min(1, "").max(30, "Máximo 30 sellos"),
  logoUrl: z.string().url(),
  textColor: z.string().regex(regexes.regexColor),
  backgroundColor: z.string().regex(regexes.regexColor),
});
type LoyaltyPassType = z.infer<typeof loyaltyPassSchema>;

interface CreatePassTemplateType {
  title: string;
  stampGoal: string;
  logoUrl: string;
  textColor: string;
  backgroundColor: string;
  googleClassId: string;
  applePassTypeIdentifier: string;
  passFields: PassField[];
}

interface CreatePassTemplateResponse extends CreatePassTemplateType {
  uuid: string;
}

export { loyaltyPassSchema };
export type { LoyaltyPassType, CreatePassTemplateType, CreatePassTemplateResponse };
