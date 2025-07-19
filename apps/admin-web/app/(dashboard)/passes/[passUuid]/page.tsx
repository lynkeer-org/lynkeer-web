interface PageProps {
  params: Promise<{ passUuid: string }>;
}

export default async function PassDetailsPage({ params }: PageProps) {
  const { passUuid } = await params;

  return (
    <main>
      <h1>Detalles de la tarjeta</h1>
      <p>{passUuid}</p>
    </main>
  );
}
