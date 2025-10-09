import { Button } from "@lynkeer/ui/components/button";
import Link from "next/link";

function CreatePass() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-lg font-semibold">Crear tarjeta</h1>

      <Link href="/passes/create" className="transition-all duration-200 ease-in-out hover:scale-[1.02]">
        <div className="w-60 h-80 bg-muted border rounded-3xl" />
      </Link>

      <Button asChild>
        <Link href="/passes/create">Crear tarjeta</Link>
      </Button>
    </div>
  );
}

export { CreatePass };
