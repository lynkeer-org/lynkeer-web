import { createLoyaltyPass } from "@/lib/wallets/apple/createPass";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeName = searchParams.get("storeName") || "";

  const passBuffer = await createLoyaltyPass(storeName);

  return new NextResponse(passBuffer, {
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename=loyalty-pass-${storeName}.pkpass`,
    },
  });
}
