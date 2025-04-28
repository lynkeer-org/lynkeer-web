import { LoginForm } from "@/components/login-form";
import { LogoFull } from "@lynkeer/ui/components/logoFull";
import { ModeToggle } from "@lynkeer/ui/components/modeToggle";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-5">
        <LogoFull className="h-10 text-foreground" />
        <LoginForm />
      </div>
    </div>
  );
}
