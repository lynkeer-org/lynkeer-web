import { redirect } from "next/navigation";

export default async function Page() {
  redirect(`${process.env.NEXT_PUBLIC_DEFAULT_ROUTE}`);
}
