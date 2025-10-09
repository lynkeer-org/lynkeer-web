"use client";

import Image from "next/image";

import { Skeleton } from "@lynkeer/ui/components/skeleton";

interface AddWalletBadgeProps {
  os: string | undefined;
}

function AddWalletBadge({ os }: AddWalletBadgeProps) {
  if (!os) {
    return <Skeleton className="h-12 w-45 md:h-14" />;
  }

  const walletImage = () => {
    if (os === "ios") {
      return (
        <div className="inline-flex items-center py-1 px-2 md:py-1.5 md:px-3">
          <Image
            className="h-12 w-auto md:h-14"
            src="/images/add_apple_wallet_ES.svg"
            alt="apple wallet"
            width={256}
            height={80}
          />
        </div>
      );
    }

    return (
      <div className="inline-flex items-center p-2 md:p-3">
        <Image
          className="h-12 w-auto md:h-14"
          src="/images/add_google_wallet_ES.svg"
          alt="google wallet"
          width={256}
          height={80}
        />
      </div>
    );
  };

  return walletImage();
}

export { AddWalletBadge };
