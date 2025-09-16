import { templatePassTypes } from "@/features/passes/lib/templatePassType";
import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";
import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";
import { v4 as uuidv4 } from "uuid";

async function googleCreateLoyaltyClass(data: LoyaltyPassType) {
  const loyaltyPass = new LoyaltyPass();

  const classSuffix = `${templatePassTypes.loyaltyPassType}_${uuidv4()}`;
  const classId = await loyaltyPass.createClass(data, classSuffix);

  return { classId };
}

export { googleCreateLoyaltyClass };
