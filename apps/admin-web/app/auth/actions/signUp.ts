"use server";

import { signIn } from "@/features/auth/lib/auth";
import { errorTypes } from "@/features/auth/lib/errorTypes";
import { signUpRequest } from "@/features/auth/services/signUp";
import type { OwnerType } from "@/features/auth/types/auth";
import { HttpStatusCode } from "axios";

export async function signUpAction(data: OwnerType) {
  try {
    const response = await signUpRequest(data);

    if (!(response.status === HttpStatusCode.Created)) {
      return { error: response.error };
    }

    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!signInResponse) {
      return { error: { code: errorTypes.SIGN_IN_ERROR, message: "Automatic sign-in failed" } };
    }

    return signInResponse;
  } catch (_error) {
    return { error: { code: errorTypes.SIGN_IN_ERROR, message: "Automatic sign-in failed" } };
  }
}
