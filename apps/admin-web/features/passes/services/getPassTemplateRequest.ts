import { errorTypes } from "@/features/passes/lib/errorTypes";
import type { GetPassTemplateResponse } from "@/features/passes/types/loyaltyPassSchema";
import { privateApi } from "@/lib/axios/privateApi";
import { redirectToSignOut } from "@/lib/axios/requestValidation";
import { serviceApi } from "@/lib/axios/serviceApi";
import type { ApiType } from "@/lib/axios/types";

async function getPassTemplateRequest(passUuid: string, apiType: ApiType = "private") {
  try {
    const api = apiType === "private" ? privateApi : serviceApi;
    const response = await api.get<GetPassTemplateResponse>(`/v1/pass-template/${passUuid}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    // Only redirect to sign out for private API errors (user authentication issues)
    if (apiType === "private") {
      redirectToSignOut(error);
    }
    return {
      error: {
        code: errorTypes.GET_PASS_TEMPLATE_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: GetPassTemplate",
      },
    };
  }
}

export { getPassTemplateRequest };
