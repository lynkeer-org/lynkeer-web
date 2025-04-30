import { LogoFull } from "@lynkeer/ui/components/logoFull";
import { ModeToggle } from "@lynkeer/ui/components/modeToggle";
import Link from "next/link";

import type React from "react";

interface Props {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-5">
        <LogoFull className="h-10 text-foreground" />
        {children}
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al continuar, aceptas nuestros <Link href="/terms">Términos y condiciones</Link>
      </div>
    </div>
  );
}
