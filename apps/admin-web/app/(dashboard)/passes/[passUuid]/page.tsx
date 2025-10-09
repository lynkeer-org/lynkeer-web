import { PassDetailPage } from "@/features/passes/pages/PassDetailPage";

interface PageProps {
  params: Promise<{ passUuid: string }>;
}

export default async function Page({ params }: PageProps) {
  const { passUuid } = await params;

  return <PassDetailPage passUuid={passUuid} />;
}
