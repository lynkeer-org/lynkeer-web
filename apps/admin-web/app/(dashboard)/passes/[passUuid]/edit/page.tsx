import { PassFormPage } from "@/features/passes/pages/PassFormPage";

interface PageProps {
  params: Promise<{
    passUuid: string;
  }>;
}

export default async function EditPassPage({ params }: PageProps) {
  const { passUuid: _dataTmp } = await params;

  // Access the passUuid param from the route
  // Edit functionality not implemented yet, just renders the form page
  return <PassFormPage />;
}
