import { RegisterPassPage } from "@/features/registerPass/pages/RegisterPassPage";

interface PageProps {
  params: Promise<{ passUuid: string }>;
  searchParams: Promise<{ passTitle: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { passUuid } = await params;
  const { passTitle } = await searchParams;

  return <RegisterPassPage passUuid={passUuid} passTitle={passTitle} />;
}
