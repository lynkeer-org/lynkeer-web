import { errorTypes } from "@/features/registerPass/lib/errorTypes";
import type {
  AddPassToAppleWalletRequest,
  AddPassToAppleWalletResponse,
} from "@/features/registerPass/types/registerTypes";
import { adminApi } from "@/lib/axios/adminApi";

async function addPassToAppleWalletRequest({ passUuid, data }: AddPassToAppleWalletRequest) {
  try {
    const response = await adminApi.post<AddPassToAppleWalletResponse>("/wallet/apple/loyaltyPass", {
      pass_uuid: passUuid,
      user_data: { ...data, os: "ios", registrationMethod: "qr" },
    });

    return { status: response.status, data: response.data };
  } catch (error) {
    return {
      error: {
        code: errorTypes.ADD_PASS_TO_APPLE_WALLET_ERROR,
        message: error instanceof Error ? error.message : "An unknown error occurred: AddPassToAppleWallet",
      },
    };
  }
}

export { addPassToAppleWalletRequest };
