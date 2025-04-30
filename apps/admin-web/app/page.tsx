import { redirect } from "next/navigation";

export default function Page() {
  const logged = false;

  if (!logged) {
    redirect("/auth/sign-up");
  }

  redirect("/cards");
}
