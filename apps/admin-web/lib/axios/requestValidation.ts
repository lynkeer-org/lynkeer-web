import { HttpStatusCode } from "axios";
import type { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const redirectToSignOut = (error: unknown) => {
  const axiosError = error as AxiosError;

  if (axiosError?.response?.status === HttpStatusCode.Unauthorized) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/sign-out";
    } else {
      redirect("/auth/sign-out");
    }
  }
};
