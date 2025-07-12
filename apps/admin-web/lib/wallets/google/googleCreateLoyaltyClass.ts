import slugify from "slugify";

import { auth } from "@/features/auth/lib/auth";
import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";

import { templatePassTypes } from "@/features/passes/lib/templatePassType";

import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";

async function googleCreateLoyaltyClass(data: LoyaltyPassType) {
  const session = await auth.auth();
  const loyaltyPass = new LoyaltyPass();

  const ownerId = session?.user.id;
  const classSuffix = `${templatePassTypes.loyaltyPassType}_${ownerId}_${slugify(data.passName, { lower: true, strict: true })}`;
  const classId = await loyaltyPass.createClass(data, classSuffix);

  return { classId };
}

export { googleCreateLoyaltyClass };
