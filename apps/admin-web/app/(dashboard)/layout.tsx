import { auth } from "@/features/auth/lib/auth";
import { redirect } from "next/navigation";

import type React from "react";

interface Props {
  readonly children: React.ReactNode;
}

export default async function LayoutDashboard({ children }: Props) {
  const session = await auth.auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <div>{children}</div>;
}
