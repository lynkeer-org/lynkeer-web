"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { loyaltyPassSchema } from "@/features/passes/types/loyaltyPassSchema";
import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";

import { PassForm } from "@/features/passes/components/passForm";
import { PassPreview } from "@/features/passes/components/passPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lynkeer/ui/components/tabs";
import { FormProvider, useForm } from "react-hook-form";

export function CreatePassPageClient() {
  const methods = useForm<LoyaltyPassType>({ resolver: zodResolver(loyaltyPassSchema) });

  return (
    <FormProvider {...methods}>
      <div className="md:hidden">
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
      </div>

      <div className="hidden md:grid grid-cols-2 gap-4">
        <div className="px-6">
          <PassForm />
        </div>

        <div>
          <PassPreview />
        </div>
      </div>
    </FormProvider>
  );
}
