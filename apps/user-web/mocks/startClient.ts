export async function startClient() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    worker.start({ onUnhandledRequest: "bypass" });
  }
}
