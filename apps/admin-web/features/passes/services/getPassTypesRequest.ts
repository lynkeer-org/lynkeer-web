import { errorTypes } from "@/features/passes/lib/errorTypes";
import type { PassType } from "@/features/passes/types/passType";
import { privateApi } from "@/lib/axios/privateApi";
import { redirectToSignOut } from "@/lib/axios/requestValidation";

async function getPassTypesRequest() {
  try {
    const response = await privateApi.get<PassType[]>("/v1/types-passes");
    return { status: response.status, data: response.data };
  } catch (error) {
    redirectToSignOut(error);
    return {
      error: {
        code: errorTypes.GET_PASS_TYPES_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: GetPassTypes",
      },
    };
  }
}

export { getPassTypesRequest };
