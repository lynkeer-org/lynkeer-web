import { RegisterPassForm } from "@/features/registerPass/components/registerPassForm";
import { ModeToggle } from "@lynkeer/ui/components/modeToggle";

interface RegisterPassPageProps {
  passUuid: string;
  passTitle: string;
}

function RegisterPassPage({ passUuid, passTitle }: RegisterPassPageProps) {
  return (
    <main>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <header>
          <div className="absolute top-3 right-3">
            <ModeToggle />
          </div>

          <div className="flex justify-center">
            <h1 className="text-xl font-semibold">{passTitle}</h1>
          </div>
        </header>

        <div className="flex w-full max-w-sm flex-col gap-5">
          <RegisterPassForm passUuid={passUuid} />
        </div>

        <div>{/* Terminos de uso */}</div>
      </div>
    </main>
  );
}

export { RegisterPassPage };
