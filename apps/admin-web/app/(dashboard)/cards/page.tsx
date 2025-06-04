import { Button } from "@lynkeer/ui/components/button";
import Link from "next/link";

export default function CardsPage() {
  return (
    <section className="flex flex-col items-center h-screen gap-5">
      <h1>Crear tarjeta</h1>

      <div className="w-60 h-120 bg-muted border rounded-3xl" />

      <Button asChild>
        <Link href="/cards/create">Crear tarjeta</Link>
      </Button>
    </section>
  );
}
