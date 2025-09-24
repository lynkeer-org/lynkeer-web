import { apiMockingEnv } from "@/lib/utils/environmentValues";

let serverStarted = false;

export async function startServer() {
  if (typeof window === "undefined" && apiMockingEnv === "enabled" && !serverStarted) {
    const { server } = await import("@/mocks/server");
    server.listen({ onUnhandledRequest: "bypass" });
    serverStarted = true;
  }
}
