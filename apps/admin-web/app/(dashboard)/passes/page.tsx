import { Button } from "@lynkeer/ui/components/button";
import Link from "next/link";

export default function PassesPage() {
  return (
    <section className="flex flex-col items-center h-screen gap-5">
      <h1>Crear tarjeta</h1>

      <div className="w-60 h-80 bg-muted border rounded-3xl" />

      <Button asChild>
        <Link href="/passes/create">Crear tarjeta</Link>
      </Button>
    </section>
  );
}
