import { addPassToAppleWalletAction } from "@/app/register/actions/addPassToAppleWalletAction";
import { useMutation } from "@tanstack/react-query";

export function useAddPassToAppleWallet() {
  return useMutation({ mutationKey: ["add-pass-to-apple-wallet"], mutationFn: addPassToAppleWalletAction });
}
