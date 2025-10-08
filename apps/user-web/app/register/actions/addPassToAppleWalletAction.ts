"use server";

import { addPassToAppleWalletRequest } from "@/features/registerPass/services/addPassToAppleWalletRequest";
import type { AddPassToAppleWalletRequest } from "@/features/registerPass/types/registerTypes";
import { HttpStatusCode } from "axios";

async function addPassToAppleWalletAction(payload: AddPassToAppleWalletRequest) {
  const response = await addPassToAppleWalletRequest(payload);

  if (response.error) {
    throw new Error(response.error.message, { cause: response.error });
  }

  return { success: response.status === HttpStatusCode.Created, data: response.data };
}

export { addPassToAppleWalletAction };
