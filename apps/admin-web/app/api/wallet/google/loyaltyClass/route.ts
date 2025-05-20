import { auth } from "@/features/auth/lib/auth";
import type { CardType } from "@/features/cards/types/cardSchema";
import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: NextRequest) {
  const session = await auth.auth();
  const body: CardType = await request.json();
  const loyaltyPass = new LoyaltyPass();

  const ownerId = session?.user.id;
  const classSuffix = `loyalty_${slugify(body.cardName, { lower: true, strict: true })}_${ownerId}`;
  const classId = await loyaltyPass.createClass(body, classSuffix);

  return NextResponse.json({ classId }, { status: 200 });
}
