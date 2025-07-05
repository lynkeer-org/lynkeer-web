import { PassForm } from "@/features/passes/components/passForm";
import { PassPreview } from "@/features/passes/components/passPreview";

export default function CreatePassPage() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <PassForm />

        <PassPreview />
      </div>
    </section>
  );
}
