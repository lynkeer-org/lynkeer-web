import { defaultRouteEnv } from "@/lib/utils/environmentValues";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(defaultRouteEnv);
}
