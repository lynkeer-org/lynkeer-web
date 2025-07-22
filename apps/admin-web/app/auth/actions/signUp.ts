"use server";

import { signUpRequest } from "@/features/auth/services/signUp";
import type { OwnerType } from "@/features/auth/types/auth";
import { startServer } from "@/mocks/startServer";
import { HttpStatusCode } from "axios";
import { signInAction } from "./signIn";

export async function signUpAction(data: OwnerType) {
  await startServer();
  const response = await signUpRequest(data);

  if (response?.status !== HttpStatusCode.Created) {
    return { error: response?.error };
  }

  return await signInAction({ email: data.email, password: data.password });
}
