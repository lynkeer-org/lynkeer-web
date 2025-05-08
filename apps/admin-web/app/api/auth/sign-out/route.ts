import { auth } from "@/features/auth/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await auth.signOut();

  return NextResponse.json({ success: true });
}
