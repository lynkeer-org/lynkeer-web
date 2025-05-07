import { errorTypes } from "@/features/auth/lib/errorTypes";
import type { OwnerType, UserType } from "@/features/auth/types/auth";
import { publicApi } from "@/lib/axios/publicApi";
import type { Response } from "@/lib/axios/types";

// Mock implementation
async function signUpRequest(_data: OwnerType) {
  try {
    // Original implementation
    // const response = await publicApi.post("/auth/sign-up", data);
    // return response;

    // Mock implementation
    // throw new Error("Error: sign-up");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { status: 201 };
  } catch (error) {
    // TODO: Use a sentry system to log an error.
    return {
      error: {
        code: errorTypes.SIGN_UP_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: SignUp",
      },
    };
  }
}

export { signUpRequest };
