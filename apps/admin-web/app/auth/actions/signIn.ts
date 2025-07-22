"use server";

import { auth } from "@/features/auth/lib/auth";
import { errorTypes } from "@/features/auth/lib/errorTypes";
import type { SignInType } from "@/features/auth/types/auth";
import { startServer } from "@/mocks/startServer";

export async function signInAction(data: SignInType) {
  try {
    await startServer();

    const response = await auth.signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!response) {
      return { error: { code: errorTypes.SIGN_IN_ERROR, message: "Automatic sign-in failed" } };
    }

    return response;
  } catch (_error) {
    return { error: { code: errorTypes.SIGN_IN_ERROR, message: "Automatic sign-in failed" } };
  }
}
