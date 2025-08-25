"use server";

import { addPassToGoogleWalletRequest } from "@/features/registerPass/services/addPassToGoogleWalletRequest";
import type { AddPassToGoogleWalletRequest } from "@/features/registerPass/types/registerTypes";
import { HttpStatusCode } from "axios";

async function addPassToGoogleWalletAction(payload: AddPassToGoogleWalletRequest) {
  const response = await addPassToGoogleWalletRequest(payload);

  if (response.error) {
    throw new Error(response.error.message, { cause: response.error });
  }

  return { success: response.status === HttpStatusCode.Created, data: response.data };
}

export { addPassToGoogleWalletAction };
