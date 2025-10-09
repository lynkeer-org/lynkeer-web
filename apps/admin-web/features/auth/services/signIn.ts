import type { SignInType, UserType } from "@/features/auth/types/auth";
import { publicApi } from "@/lib/axios/publicApi";
import type { ApiResponse } from "@/lib/axios/types";

async function signInRequest(data: SignInType): Promise<ApiResponse<UserType>> {
  const response = await publicApi.post<UserType>("/v1/sign-in", data);
  return response;
}

export { signInRequest };
