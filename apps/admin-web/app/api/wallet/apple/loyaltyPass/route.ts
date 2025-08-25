export const dynamic = "force-dynamic";

import { createLoyaltyPass } from "@/lib/wallets/apple/createPass";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const storeName = searchParams.get("storeName") || "";
  const format = searchParams.get("format"); // "blob" para obtener base64

  // Datos adicionales del usuario que puedes usar
  const _userId = searchParams.get("userId");
  const _userEmail = searchParams.get("userEmail");
  const _userName = searchParams.get("userName");

  const passBuffer = await createLoyaltyPass(storeName);

  // Si solicitan formato blob, retornar base64
  if (format === "blob") {
    return NextResponse.json({
      data: passBuffer.toString("base64"),
      filename: `loyalty-pass-${storeName}.pkpass`,
      contentType: "application/vnd.apple.pkpass",
    });
  }

  // Comportamiento por defecto: descarga directa
  return new NextResponse(passBuffer, {
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename=loyalty-pass-${storeName}.pkpass`,
    },
  });
}
