"use client";

import { LoadingPage } from "@/components/LoadingPage";
import { CreatePass } from "@/features/passes/components/CreatePass";
import { PassTemplateCard } from "@/features/passes/components/PassTemplateCard";
import { useGetPassTemplateList } from "@/features/passes/hooks/useGetPassTemplateList";
import { useIsMobile } from "@lynkeer/ui/hooks/use-mobile";

function PassesPage() {
  const { isMobile, isDetectingDevice } = useIsMobile();
  const { data, isLoading } = useGetPassTemplateList();
  // TODO: add error handling for getPassTemplateList

  if (isDetectingDevice || isLoading) {
    return <LoadingPage />;
  }

  // Show centered CreatePass when no passes exist
  if (!data || data.length === 0) {
    return (
      <section className="h-screen flex items-center justify-center">
        <CreatePass />
      </section>
    );
  }

  // Show grid layout when passes exist
  return (
    <section
      className={
        isMobile ? "flex flex-col gap-6 p-4" : "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 p-6"
      }
    >
      <CreatePass />

      {data.map((passTemplate) => (
        <PassTemplateCard key={passTemplate.id} passTemplate={passTemplate} />
      ))}
    </section>
  );
}

export { PassesPage };
