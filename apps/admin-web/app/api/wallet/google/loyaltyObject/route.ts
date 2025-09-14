import { createCustomer } from "@/app/customer/actions/createCustomer";
import { createCustomerPass } from "@/app/customer/actions/createCustomerPass";
import { getCustomerByEmail } from "@/app/customer/actions/getCustomerByEmail";
import type { CreateCustomerRequest, CustomerResponse } from "@/features/customer/types/customer";
import type { GetPassTemplateResponse } from "@/features/passes/types/loyaltyPassSchema";
import { serviceApi } from "@/lib/axios/serviceApi";
import { baseAppUrlEnv } from "@/lib/utils/environmentValues";
import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
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

    let customerResult: CustomerResponse;
    const existingCustomer = await getCustomerByEmail(userData.email);

    if (existingCustomer?.data?.id) {
      customerResult = existingCustomer.data;
    } else {
      const { data: newCustomer } = await createCustomer(customerData);
      customerResult = newCustomer;
    }

    const { data: passTemplateData } = await serviceApi.get<GetPassTemplateResponse>(`/v1/pass-template/${passUuid}`);

    if (!passTemplateData?.id) {
      throw new Error("Pass template not found");
    }

    // ObjectSuffix: Unique by customerId (CI) and passTemplateId (PTI) ex: user_CI1234567890_PTI1234567890
    const loyaltyPass = new LoyaltyPass();
    const objectSuffix = `user_CI${customerResult.id}_PTI${passTemplateData.id}`;
    const urlImageStamps = `${baseAppUrlEnv}/api/wallet/stamps/${passTemplateData.stampGoal}/0/stamps.png`;

    const objectId = await loyaltyPass.createObject(
      {
        classId: passTemplateData.googleClassId as string,
        customerId: customerResult.id,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        urlImageStamps,
        stamps: 0,
        rewards: 0,
      },
      objectSuffix,
    );

    // const jwt = loyaltyPass.generateAddToWalletJwt(objectId);
    // const saveUrl = loyaltyPass.generateSaveLink(jwt);

    const customerPassData = {
      customerId: customerResult.id,
      passId: passTemplateData.id,
      device: userData.os,
      registrationMethod: userData.registrationMethod,
      stamps: 0,
      rewards: 0,
      // Specific to Google Wallet
      google_id_class: passTemplateData.googleClassId,
      google_id_object: objectId,
      // google_wallet_url: saveUrl,
      google_wallet_url: "test_url",
    };

    const { data: customerPass } = await createCustomerPass(customerPassData);

    if (!customerPass.id) {
      throw new Error("Failed to create customer pass");
    }

    return NextResponse.json({ url: "test_url" }, { status: 200 });
    // return NextResponse.json({ url: saveUrl }, { status: 200 });
  } catch (error) {
    console.error("Error in loyaltyObject route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
