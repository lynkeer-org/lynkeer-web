import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const loyaltyPass = new LoyaltyPass();
    const classSuffix = body.classId.split(".")[1];
    const objectSuffix = `${classSuffix}_${body.email.replace(/[^\w.-]/g, "_")}`;

    const objectData = loyaltyPass.formatObjectForWallet({
      objectSuffix: objectSuffix,
      classId: body.classId,
      name: body.name,
      email: body.email,
      urlImageStamps: body.urlImageStamps,
      stamps: body.stamps,
    });

    const jwt = loyaltyPass.generateAddToWalletJwt(objectData);
    const saveUrl = loyaltyPass.generateSaveLink(jwt);

    return NextResponse.json({ url: saveUrl }, { status: 200 });
  } catch (error) {
    console.error("Error creating loyalty object", { error });
    return NextResponse.json({ error: "Error creating loyalty object" }, { status: 500 });
  }
}
