"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    const asyncSignOut = async () => {
      await fetch("/api/auth/sign-out", { method: "GET" });

      redirect("/auth/sign-in");
    };

    asyncSignOut();
  }, []);

  return null;
}
