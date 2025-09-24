import { errorTypes } from "@/features/registerPass/lib/errorTypes";
import type {
  AddPassToGoogleWalletRequest,
  AddPassToGoogleWalletResponse,
} from "@/features/registerPass/types/registerTypes";
import { adminApi } from "@/lib/axios/adminApi";

async function addPassToGoogleWalletRequest({ passUuid, data }: AddPassToGoogleWalletRequest) {
  try {
    const response = await adminApi.post<AddPassToGoogleWalletResponse>("/wallet/google/loyaltyObject", {
      pass_uuid: passUuid,
      user_data: { ...data, os: "android" },
    });

    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      error: {
        code: errorTypes.ADD_PASS_TO_GOOGLE_WALLET_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: AddPassToGoogleWallet",
      },
    };
  }
}

export { addPassToGoogleWalletRequest };
