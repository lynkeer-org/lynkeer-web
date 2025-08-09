import { Tabs, TabsList, TabsTrigger } from "@lynkeer/ui/components/tabs";
import { useState } from "react";

import { AppleIcon } from "@lynkeer/ui/components/apple-icon";
import { GoogleIcon } from "@lynkeer/ui/components/google-icon";

import { PassContainer } from "./PassContainer";
import { PassFields } from "./PassFields";
import { PassGoogleTitle } from "./PassGoogleTitle";
import { PassHeader } from "./PassHeader";
import { PassQrcode } from "./PassQrcode";
import { PassSkeleton } from "./PassSkeleton";
import { PassStrip } from "./PassStrip";

interface PassPreviewProps {
  isLoading: boolean;
  backgroundColor: string;
  textColor: string;
  logoUrl: string;
  passName: string;
  stampGoal: number | string;
}

function PassPreview({ isLoading, backgroundColor, textColor, logoUrl, passName, stampGoal }: PassPreviewProps) {
  const [walletProvider, setWalletProvider] = useState<"apple" | "google">("apple");

  const handleChangeWalletProvider = (value: string) => {
    setWalletProvider(value as "apple" | "google");
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <section className="sticky top-6">
        <PassSkeleton />
      </section>
    );
  }

  return (
    <section className="sticky top-6">
      {/* Pass Preview */}
      <PassContainer backgroundColor={backgroundColor} textColor={textColor}>
        <PassHeader logoUrl={logoUrl} passName={passName} />
        {walletProvider === "google" && <PassGoogleTitle title={passName} />}
        {walletProvider === "apple" && <PassStrip stampGoal={String(stampGoal)} />}
        <PassFields />
        <PassQrcode value={passName} />
        {walletProvider === "google" && <PassStrip stampGoal={String(stampGoal)} />}
      </PassContainer>

      {/* Wallet selector */}
      <div className="flex justify-center mt-4">
        <Tabs value={walletProvider} onValueChange={handleChangeWalletProvider} className="w-fit">
          <TabsList>
            <TabsTrigger value="apple" className="p-1 text-sm font-medium leading-none">
              <AppleIcon className="size-4" />
            </TabsTrigger>

            <TabsTrigger value="google" className="p-1 text-sm font-medium leading-none">
              <GoogleIcon className="size-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}

export { PassPreview };
