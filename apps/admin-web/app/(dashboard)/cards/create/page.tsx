import { CardForm } from "@/features/cards/components/cardForm";
import { CardPreview } from "@/features/cards/components/cardPreview";

export default function CreateCardPage() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardForm />

        <CardPreview />
      </div>
    </section>
  );
}
