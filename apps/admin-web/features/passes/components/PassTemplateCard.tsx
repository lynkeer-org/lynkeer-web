import { Button } from "@lynkeer/ui/components/button";
import Link from "next/link";

import type { GetPassTemplateResponse } from "@/features/passes/types/loyaltyPassSchema";
import { defaultLogoUrlEnv } from "@/lib/utils/environmentValues";
import { PassPreview } from "./PassPreview";

interface PassTemplateCardProps {
  passTemplate: GetPassTemplateResponse;
}

function PassTemplateCard({ passTemplate }: PassTemplateCardProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-lg font-semibold">{passTemplate.title}</h1>

      <Link
        href={`/passes/${passTemplate.id}`}
        className="w-60 h-80 transition-all duration-200 ease-in-out hover:scale-[1.02]"
      >
        <PassPreview
          isLoading={false}
          backgroundColor={passTemplate.backgroundColor}
          textColor={passTemplate.textColor}
          logoUrl={passTemplate.logoUrl || defaultLogoUrlEnv}
          passName={passTemplate.title}
          stampGoal={passTemplate.stampGoal}
          hideProviderTabs={true}
        />
      </Link>

      <Button asChild variant="secondary">
        <Link href={`/passes/${passTemplate.id}/edit`}>Editar</Link>
      </Button>
    </div>
  );
}

export { PassTemplateCard };
