"use server";

import { getPassFields } from "@/features/passes/lib/passFieldMapper";
import { templatePassTypes } from "@/features/passes/lib/templatePassType";
import { createPassTemplateRequest } from "@/features/passes/services/createPassTemplate";
import { loyaltyPassSchema } from "@/features/passes/types/loyaltyPassSchema";
import type { CreatePassTemplateType, LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";
import { passTypeIdentifierEnv } from "@/lib/utils/environmentValues";
import { googleCreateLoyaltyClass } from "@/lib/wallets/google/googleCreateLoyaltyClass";
import { startServer } from "@/mocks/startServer";
import { HttpStatusCode } from "axios";

async function createLoyaltyPassTemplates(form: LoyaltyPassType) {
  await startServer();
  const validatedFields = loyaltyPassSchema.safeParse(form);
  if (!validatedFields.success) {
    throw new Error("Invalid form", { cause: validatedFields.error });
  }

  const data = validatedFields.data;

  try {
    const { classId: googleClassId } = await googleCreateLoyaltyClass(data);

    const passFields = getPassFields(data, templatePassTypes.loyaltyPassType);

    const passTemplateData: CreatePassTemplateType = {
      title: data.passName,
      stampGoal: data.stampGoal,
      logoUrl: data.logoUrl,
      textColor: data.textColor,
      backgroundColor: data.backgroundColor,
      googleClassId: googleClassId,
      applePassTypeIdentifier: passTypeIdentifierEnv ?? "",
      passFields: passFields,
    };

    const response = await createPassTemplateRequest(passTemplateData);

    if (response.error) {
      throw new Error(response.error.message, { cause: response.error });
    }

    return { success: response.status === HttpStatusCode.Created, uuid: response.data.uuid };
  } catch (error) {
    throw new Error("Failed to create pass templates. Please try again.", { cause: error });
  }
}

export { createLoyaltyPassTemplates };
