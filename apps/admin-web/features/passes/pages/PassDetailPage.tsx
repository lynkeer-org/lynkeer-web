"use client";

import { useGetPassTemplate } from "@/features/passes/hooks/useGetPassTemplate";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingPage } from "@/components/LoadingPage";
import { NotFoundData } from "@/components/NotFoundData";
import { ActivationInfo } from "@/features/passes/components/ActivationInfo";
import { PassPreview } from "@/features/passes/components/PassPreview";
import { passesRoutes } from "@/lib/utils/appRoutes";
import { defaultLogoUrlEnv } from "@/lib/utils/environmentValues";
import { Button } from "@lynkeer/ui/components/button";
import { Skeleton } from "@lynkeer/ui/components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lynkeer/ui/components/tabs";
import { useIsMobile } from "@lynkeer/ui/hooks/use-mobile";
import { useRouter } from "next/navigation";

interface PassDetailPageProps {
  passUuid: string;
}

function PassDetailPage({ passUuid }: PassDetailPageProps) {
  const { isMobile, isDetectingDevice } = useIsMobile();
  const { data: passTemplate, isLoading, isError, refetch } = useGetPassTemplate(passUuid);
  const router = useRouter();

  if (isError) {
    return <ErrorMessage title="Error al obtener la tarjeta" actionLabel="Reintentar" onAction={refetch} />;
  }

  if (isDetectingDevice) {
    return <LoadingPage />;
  }

  if (!passTemplate && !isLoading) {
    return (
      <NotFoundData
        title="No se encontró la tarjeta"
        description="La tarjeta no existe o ha sido eliminada. Por favor, verifica la URL o regresa a la página de tarjetas."
        actionLabel="Regresar"
        onAction={() => router.push(passesRoutes.ROOT)}
      />
    );
  }

  const previewEl = (
    <PassPreview
      isLoading={isLoading}
      backgroundColor={passTemplate?.backgroundColor ?? "#FFFFFF"}
      textColor={passTemplate?.textColor ?? "#000000"}
      logoUrl={passTemplate?.logoUrl ?? defaultLogoUrlEnv}
      passName={passTemplate?.title ?? ""}
      stampGoal={passTemplate?.stampGoal ?? 0}
    />
  );

  return (
    <section>
      <div className="flex justify-between px-2 md:px-6 pb-5">
        <h1 className="text-xl md:text-2xl font-semibold">
          {isLoading ? <Skeleton className="w-30 h-8" /> : passTemplate?.title}
        </h1>

        <Button variant="secondary">Editar</Button>
      </div>

      {isMobile ? (
        <Tabs className="px-2" defaultValue="activation-links">
          <TabsList className="w-full">
            <TabsTrigger value="activation-links">Activación</TabsTrigger>
            <TabsTrigger value="pass-preview">Tarjeta</TabsTrigger>
          </TabsList>

          <TabsContent value="activation-links">
            <div className="py-4">
              <ActivationInfo passTitle={passTemplate?.title} passUuid={passUuid} />
            </div>
          </TabsContent>

          <TabsContent value="pass-preview">
            <div className="py-4">{previewEl}</div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-6">
          <ActivationInfo passTitle={passTemplate?.title} passUuid={passUuid} />

          <div className="flex items-center justify-center">{previewEl}</div>
        </div>
      )}
    </section>
  );
}

export { PassDetailPage };
