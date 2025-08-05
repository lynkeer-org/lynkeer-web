import { errorTypes } from "@/features/auth/lib/errorTypes";
import type { OwnerType } from "@/features/auth/types/auth";
import { publicApi } from "@/lib/axios/publicApi";

async function signUpRequest(data: OwnerType) {
  try {
    const response = await publicApi.post("/v1/sign-up", data);

    return { status: response.status };
  } catch (error) {
    return {
      error: {
        code: errorTypes.SIGN_UP_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: SignUp",
      },
    };
  }
}

export { signUpRequest };
