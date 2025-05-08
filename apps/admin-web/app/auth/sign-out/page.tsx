"use client";

import { Loader2 } from "lucide-react";
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

  return (
    <div className="bg-muted min-h-svh flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={80} strokeWidth={1} />
    </div>
  );
}
