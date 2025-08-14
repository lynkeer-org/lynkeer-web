"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { loyaltyPassSchema } from "@/features/passes/types/loyaltyPassSchema";
import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";

import { LoadingPage } from "@/components/LoadingPage";
import { PassForm } from "@/features/passes/components/PassForm";
import { PassPreview } from "@/features/passes/components/PassPreview";
import { useGetPassTypes } from "@/features/passes/hooks/useGetPassTypes";
import { defaultLogoUrlEnv } from "@/lib/utils/environmentValues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lynkeer/ui/components/tabs";
import { useIsMobile } from "@lynkeer/ui/hooks/use-mobile";
import { FormProvider, useForm } from "react-hook-form";

export function CreatePassPage() {
  const { isMobile, isDetectingDevice } = useIsMobile();
  const { isLoading: isLoadingPassTypes } = useGetPassTypes();

  const methods = useForm<LoyaltyPassType>({
    defaultValues: {
      logoUrl: defaultLogoUrlEnv,
      textColor: "#000000",
      backgroundColor: "#FFFFFF",
    },
    resolver: zodResolver(loyaltyPassSchema),
  });

  if (isDetectingDevice) {
    return <LoadingPage />;
  }

  const formData = methods.watch();
  const isEmptyForm = Object.values(formData ?? {}).every(
    (value) => value === "" || value === undefined || value === null,
  );

  const previewEl = (
    <PassPreview
      isLoading={isLoadingPassTypes || isEmptyForm}
      backgroundColor={formData.backgroundColor ?? "#FFFFFF"}
      textColor={formData.textColor ?? "#000000"}
      logoUrl={formData.logoUrl ?? defaultLogoUrlEnv}
      passName={formData.passName ?? ""}
      stampGoal={formData.stampGoal ?? 0}
    />
  );

  return (
    <section>
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
              <div className="py-4">{previewEl}</div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="px-6">
              <PassForm />
            </div>

            <div>{previewEl}</div>
          </div>
        )}
      </FormProvider>
    </section>
  );
}
