"use server";

import { getPassFields } from "@/features/passes/lib/passFieldMapper";
import { templatePassTypes } from "@/features/passes/lib/templatePassType";
import { createPassTemplateRequest } from "@/features/passes/services/createPassTemplateRequest";
import { loyaltyPassSchema } from "@/features/passes/types/loyaltyPassSchema";
import type { LoyaltyPassType, PassTemplateType } from "@/features/passes/types/loyaltyPassSchema";
import { passTypeIdentifierEnv } from "@/lib/utils/environmentValues";
import { googleCreateLoyaltyClass } from "@/lib/wallets/google/googleCreateLoyaltyClass";
import { HttpStatusCode } from "axios";

async function createLoyaltyPassTemplates(form: LoyaltyPassType) {
  const validatedFields = loyaltyPassSchema.safeParse(form);

  if (!validatedFields.success) {
    throw new Error("Invalid form", { cause: validatedFields.error });
  }

  const data = validatedFields.data;

  try {
    const { classId: googleClassId } = await googleCreateLoyaltyClass(data);

    const passFields = getPassFields(data, templatePassTypes.loyaltyPassType);
    const passTemplateData: PassTemplateType = {
      title: data.passName,
      stampGoal: data.stampGoal.toString(),
      logoUrl: data.logoUrl,
      textColor: data.textColor,
      backgroundColor: data.backgroundColor,
      googleClassId: googleClassId,
      applePassTypeIdentifier: passTypeIdentifierEnv ?? "",
      passTypeId: data.passTypeId,
      passFields,
    };

    const response = await createPassTemplateRequest(passTemplateData);

    if (response.error) {
      throw new Error(response.error.message, { cause: response.error });
    }

    return { success: response.status === HttpStatusCode.Created, id: response.data.id };
  } catch (error) {
    throw new Error("Failed to create pass templates. Please try again.", { cause: error });
  }
}

export { createLoyaltyPassTemplates };
