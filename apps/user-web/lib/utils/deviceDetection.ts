"use client";

export type MobileOS = "ios" | "android" | "unknown";

export interface DeviceInfo {
  os: MobileOS;
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  userAgent: string;
}

/**
 * Detects the current device's operating system
 * @returns {MobileOS} The detected operating system: 'ios', 'android' or 'unknown'
 */
export function detectOS(): MobileOS {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "unknown";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  // Detect iOS (iPhone, iPad, iPod)
  if (/iphone|mac|ipad|ipod|macintosh/.test(userAgent)) {
    return "ios";
  }

  // Detect Android
  if (/android/.test(userAgent)) {
    return "android";
  }

  return "unknown";
}
