export const dynamic = "force-dynamic";

import { getPassTemplate } from "@/app/(dashboard)/passes/actions/getPassTemplate";
import { createCustomerPass } from "@/app/customer/actions/createCustomerPass";
import { handleCustomerFlow } from "@/features/customer/lib/customerFlow";
import type { CreateCustomerRequest } from "@/features/customer/types/customer";
import { appleAuthenticationTokenEnv, baseAppUrlEnv } from "@/lib/utils/environmentValues";
import { createLoyaltyPass } from "@/lib/wallets/apple/createPass";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const passUuid = body.pass_uuid;
  const userData = body.user_data;

  try {
    const customerData: CreateCustomerRequest = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      birthDate: userData.birthDate,
    };

    // Handle customer validation/creation flow
    const customerResult = await handleCustomerFlow(customerData);

    // Get pass template data using service API
    const { data: passTemplateData } = await getPassTemplate(passUuid, "service");

    const urlImageStamps = `${baseAppUrlEnv}/api/wallet/stamps/${passTemplateData.stampGoal}/0/stamps.png`;
    const { pass: passBuffer, passData } = await createLoyaltyPass({
      title: passTemplateData.title,
      customerId: customerResult.id,
      urlImageStamps,
      stamps: 0,
      rewards: 0,
    });

    const customerPassData = {
      customerId: customerResult.id,
      passId: passTemplateData.id,
      device: userData.os,
      registrationMethod: userData.registrationMethod,
      stamps: 0,
      rewards: 0,
      apple_serial_number: passData.serialNumber,
      apple_device_library_id: "",
      apple_authentication_token: passData.authenticationToken,
      apple_push_token: appleAuthenticationTokenEnv,
    };

    const { data: customerPass } = await createCustomerPass(customerPassData);

    if (!customerPass.id) {
      throw new Error("Failed to create customer pass");
    }

    // Prepare headers - include CORS only in development
    const headers: Record<string, string> = {};

    if (process.env.NODE_ENV === "development") {
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
      headers["Access-Control-Allow-Credentials"] = "true";
    }

    // Return binary format
    return NextResponse.json(
      {
        binaryArray: Array.from(passBuffer), // Convert Buffer to array of bytes
        filename: `loyalty-pass-${passTemplateData.title.replace(/\s+/g, "-")}.pkpass`,
        contentType: "application/vnd.apple.pkpass",
      },
      { headers, status: 200 },
    );
  } catch (error) {
    console.error("Error in loyaltyPass route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
