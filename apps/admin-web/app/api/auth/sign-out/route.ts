import { signOut } from "@/features/auth/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await signOut();

  return NextResponse.json({ success: true });
}
