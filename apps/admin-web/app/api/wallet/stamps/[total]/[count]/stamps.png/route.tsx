import { StampGrid } from "@/features/passes/components/StampGrid";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/");
  const total = Number(pathParts.at(-3) ?? 0);
  const count = Number(pathParts.at(-2) ?? 0);

  return new ImageResponse(<StampGrid totalStamps={total} filledStamps={count} />, {
    width: 800,
    height: 300,
  });
}
