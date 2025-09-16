import "@testing-library/jest-dom/vitest";
import { QueryClient } from "@tanstack/react-query";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect, vi } from "vitest";
import { server } from "./mocks/server";

// Extend Vitest's expect with React Testing Library's matchers
expect.extend({});

// Create a new QueryClient instance for tests
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries in tests
      gcTime: Number.POSITIVE_INFINITY,
    },
    mutations: {
      retry: false,
    },
  },
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
  headers: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
}));

// Mock environment variables
vi.mock("./lib/utils/environmentValues", () => ({
  baseUrlApiEnv: "http://localhost:3001",
  defaultRouteEnv: "/",
  appUrlEnv: "http://localhost:3001",
}));

// Setup MSW
beforeAll(() => {
  // Start MSW server before all tests
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  // Cleanup after each test
  cleanup();
  // Reset MSW handlers
  server.resetHandlers();
  // Reset all mocks
  vi.clearAllMocks();
  // Clear React Query cache
  queryClient.clear();
});

afterAll(() => {
  // Stop MSW server after all tests
  server.close();
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "0px";
  readonly thresholds: readonly number[] = [0];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

global.IntersectionObserver = MockIntersectionObserver;

// Suppress React Query network errors in tests
const originalError = console.error;
console.error = (...args) => {
  if (/\[MSW\]/.test(args[0]) || /React Query/.test(args[0]) || /Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
