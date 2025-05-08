let serverStarted = false;

export async function startServer() {
  if (typeof window === "undefined" && process.env.NEXT_PUBLIC_API_MOCKING === "enabled" && !serverStarted) {
    const { server } = await import("@/mocks/server");
    server.listen({ onUnhandledRequest: "bypass" });
    serverStarted = true;
  }
}
