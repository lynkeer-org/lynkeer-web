import { auth } from "@/features/auth/lib/auth";

import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";

import { templatePassTypes } from "@/features/passes/lib/templatePassType";

import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";

async function googleCreateLoyaltyClass(data: LoyaltyPassType, passTemplateId: string) {
  const session = await auth.auth();
  const loyaltyPass = new LoyaltyPass();

  const ownerId = session?.user?.id;

  // ClassSuffix: Unique by templatePassType, ownerId (OI) and passTemplateId (PTI) ex: loyalty_OI1234567890_PTI1234567890
  const classSuffix = `${templatePassTypes.loyaltyPassType}_OI${ownerId}_PTI${passTemplateId}`;
  const classId = await loyaltyPass.createClass(data, classSuffix);

  return { classId };
}

export { googleCreateLoyaltyClass };
