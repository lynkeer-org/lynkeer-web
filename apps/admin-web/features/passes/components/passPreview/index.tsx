import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { AppleIcon } from "@lynkeer/ui/components/apple-icon";
import { GoogleIcon } from "@lynkeer/ui/components/google-icon";
import { Tabs, TabsList, TabsTrigger } from "@lynkeer/ui/components/tabs";
import { PassContainer } from "./passContainer";
import { PassFields } from "./passFields";
import { PassGoogleTitle } from "./passGoogleTitle";
import { PassHeader } from "./passHeader";
import { PassQrcode } from "./passQrcode";
import { PassSkeleton } from "./passSkeleton";
import { PassStrip } from "./passStrip";

function PassPreview() {
  const { watch } = useFormContext();
  const formData = watch();
  const [walletProvider, setWalletProvider] = useState<"apple" | "google">("apple");

  const handleChangeWalletProvider = (value: string) => {
    setWalletProvider(value as "apple" | "google");
  };

  if (Object.values(formData).every((value) => value === "")) {
    return <PassSkeleton />;
  }

  return (
    <section className="sticky top-6">
      {/* Pass Preview */}
      <PassContainer backgroundColor={formData.backgroundColor} textColor={formData.textColor}>
        <PassHeader logoUrl={formData.logoUrl} passName={formData.passName} />
        {walletProvider === "google" && <PassGoogleTitle title={formData.passName} />}
        {walletProvider === "apple" && <PassStrip stampGoal={formData.stampGoal} />}
        <PassFields />
        <PassQrcode value={formData.passName} />
        {walletProvider === "google" && <PassStrip stampGoal={formData.stampGoal} />}
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
