type Props = {
  params: { passUuid: string };
};

export default async function PassDetailsPage({ params }: Props) {
  const { passUuid } = await params;

  return (
    <main>
      <h1>Detalles de la tarjeta</h1>
      <p>{passUuid}</p>
    </main>
  );
}
