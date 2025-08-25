import { createCustomer } from "@/app/customer/actions/createCustomer";
import type { CustomerType } from "@/features/customer/types/customer";
import type { GetPassTemplateResponse } from "@/features/passes/types/loyaltyPassSchema";
import { serviceApi } from "@/lib/axios/serviceApi";
import { baseAppUrlEnv } from "@/lib/utils/environmentValues";
import { LoyaltyPass } from "@/lib/wallets/google/loyaltyPass";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const passUuid = body.pass_uuid;
  const userData = body.user_data;

  try {
    // Crear customer en la base de datos usando el action
    const customerData: CustomerType = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email,
      birthDate: userData.birthDate,
      deviceType: userData.os,
      registrationMethod: "qr_scan",
    };

    const { data: customerResult } = await createCustomer(customerData);

    const { data: passTemplateData } = await serviceApi.get<GetPassTemplateResponse>(`/v1/pass-template/${passUuid}`);
    const loyaltyPass = new LoyaltyPass();
    const objectSuffix = `user_${uuidv4()}`;
    const urlImageStamps = `${baseAppUrlEnv}/api/wallet/stamps/${passTemplateData.stampGoal}/0/stamps.png`;

    const _objectData = loyaltyPass.formatObjectForWallet({
      objectSuffix: objectSuffix,
      classId: passTemplateData.googleClassId,
      customerUuid: customerResult.id,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      urlImageStamps,
      stamps: 0,
    });

    // const jwt = loyaltyPass.generateAddToWalletJwt(objectData);
    // const saveUrl = loyaltyPass.generateSaveLink(jwt);

    // {
    //   id: "7d2244fb-d374-4e0e-a96e-172e3c5c518e",
    //   owner_id: "c34722fa-6185-4925-8eae-81cc8cf1dcd4",
    //   title: "test",
    //   stamp_goal: 10,
    //   logo_url: "https://admin-staging.lynkeer.com/images/defaultStore.png",
    //   text_color: "#000000",
    //   background_color: "#FFFFFF",
    //   google_class_id: "3388000000022914351.loyalty_c34722fa-6185-4925-8eae-81cc8cf1dcd4_test",
    //   apple_pass_type_identifier: "pass.com.lynkeer",
    //   pass_fields: [
    //     {
    //       id: "927e3a65-072f-4e6a-976d-d2f47777f400",
    //       key: "stampsGoal",
    //       label: "Sellos",
    //       value: "0",
    //       field_type: "secondary_field",
    //       created_at: "2025-08-05T03:45:38.210711",
    //       active: true,
    //     },
    //     {
    //       id: "62e5d62c-f340-4859-a89a-90510e41c401",
    //       key: "rewards",
    //       label: "Premios disponibles",
    //       value: "0",
    //       field_type: "secondary_field",
    //       created_at: "2025-08-05T03:45:38.217254",
    //       active: true,
    //     },
    //   ],
    // }

    /**
     * NOTA: Cambiar todos los ClassId y ObjectId por el estandar
     * 1. Traer la información del pass template
     * 2. Guardar en base de datos el objectData, saveUrl, OS, PassUuid, user info
     * {
          pass_uuid: "7d2244fb-d374-4e0e-a96e-172e3c5c518e",
          user_data: {
            firstName: "Enzo",
            lastName: "Valencia",
            phone: "525575209351",
            email: "afvalenciab@gmail.com",
            birthDate: "2024-05-31",
            terms: true,
          },
        }
          3. Todo en un try catch
     */

    return NextResponse.json({ url: "url_test" }, { status: 200 });
    // return NextResponse.json({ url: saveUrl }, { status: 200 });
  } catch (error) {
    console.error("Error in loyaltyObject route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
