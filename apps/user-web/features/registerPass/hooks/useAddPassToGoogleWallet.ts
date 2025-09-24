import { addPassToGoogleWalletAction } from "@/app/register/actions/addPassToGoogleWalletAction";
import { useMutation } from "@tanstack/react-query";

export function useAddPassToGoogleWallet() {
  return useMutation({ mutationKey: ["add-pass-to-google-wallet"], mutationFn: addPassToGoogleWalletAction });
}
