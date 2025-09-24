import { errorTypes } from "@/features/passes/lib/errorTypes";
import type { GetPassTemplateResponse } from "@/features/passes/types/loyaltyPassSchema";
import { privateApi } from "@/lib/axios/privateApi";
import { redirectToSignOut } from "@/lib/axios/requestValidation";

/**
 * Service function to fetch pass templates from the API
 * Uses privateApi for authenticated requests
 * Handles error cases and redirects to sign out if needed
 */
async function getPassTemplateListRequest() {
  try {
    const response = await privateApi.get<GetPassTemplateResponse[]>("/v1/pass-template");
    return { status: response.status, data: response.data };
  } catch (error) {
    redirectToSignOut(error);
    return {
      error: {
        code: errorTypes.GET_PASS_TEMPLATE_LIST_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: GetPassTemplateList",
      },
    };
  }
}

export { getPassTemplateListRequest };
