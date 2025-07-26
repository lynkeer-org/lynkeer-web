"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { loyaltyPassSchema } from "@/features/passes/types/loyaltyPassSchema";
import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";

import { LoadingPage } from "@/components/LoadingPage";
import { PassForm } from "@/features/passes/components/passForm";
import { PassPreview } from "@/features/passes/components/passPreview";
import { defaultLogoUrlEnv } from "@/lib/utils/environmentValues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lynkeer/ui/components/tabs";
import { useIsMobile } from "@lynkeer/ui/hooks/use-mobile";
import { FormProvider, useForm } from "react-hook-form";

export function CreatePassPageClient() {
  const methods = useForm<LoyaltyPassType>({
    defaultValues: {
      logoUrl: defaultLogoUrlEnv,
    },
    resolver: zodResolver(loyaltyPassSchema),
  });
  const { isMobile, isDetectingDevice } = useIsMobile();

  if (isDetectingDevice) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      {isMobile ? (
        <Tabs className="px-2" defaultValue="form">
          <TabsList className="w-full">
            <TabsTrigger value="form">Formulario</TabsTrigger>
            <TabsTrigger value="pass-preview">Tarjeta</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <div className="px-2 py-4">
              <PassForm />
            </div>
          </TabsContent>

          <TabsContent value="pass-preview">
            <div className="py-4">
              <PassPreview />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="px-6">
            <PassForm />
          </div>

          <div>
            <PassPreview />
          </div>
        </div>
      )}
    </FormProvider>
  );
}
