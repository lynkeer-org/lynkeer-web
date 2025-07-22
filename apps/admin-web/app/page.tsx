import { defaultRouteEnv } from "@/lib/utils/environmentValues";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect(defaultRouteEnv);
}
