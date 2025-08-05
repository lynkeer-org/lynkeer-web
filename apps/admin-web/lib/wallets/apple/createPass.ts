import { baseAppUrlEnv } from "@/lib/utils/environmentValues";
import {
  appleCertPasswordEnv,
  appleCertificatePemBase64Env,
  appleKeyPemBase64Env,
  appleWwdrPemBase64Env,
} from "@/lib/utils/environmentValues";

export async function createLoyaltyPass(_storeName: string): Promise<Buffer> {
  const certificates = {
    wwdr: Buffer.from(appleWwdrPemBase64Env || "", "base64"),
    signerCert: Buffer.from(appleCertificatePemBase64Env || "", "base64"),
    signerKey: Buffer.from(appleKeyPemBase64Env || "", "base64"),
    signerKeyPassphrase: appleCertPasswordEnv || "",
  };

  const { PKPass } = await import("passkit-generator");

  const pass = new PKPass({}, certificates, {
    description: "Example Apple Wallet Pass",
    passTypeIdentifier: "pass.com.passkitgenerator",
    serialNumber: "example",
    organizationName: "Lynkeer",
    teamIdentifier: "example",
    foregroundColor: "#000",
    labelColor: "#000",
    backgroundColor: "#fff",
  });

  // pass.type = "storeCard";
  // pass.headerFields.push(
  //   {
  //     key: "header-field-test-1",
  //     value: "Unknown",
  //   },
  //   {
  //     key: "header-field-test-2",
  //     value: "unknown",
  //   },
  // );
  // pass.addBuffer("icon.png", Buffer.from(iconFromModel));
  // pass.addBuffer("icon@2x.png", Buffer.from(iconFromModel));
  // pass.addBuffer("icon@3x.png", Buffer.from(iconFromModel));

  const stripUrl = `${baseAppUrlEnv}/api/wallet/stamps/9/1/stamps.png`;
  const imageResponse = await fetch(stripUrl);

  const stripImage = await imageResponse.arrayBuffer();
  pass.addBuffer("strip.png", Buffer.from(stripImage));

  return await pass.getAsBuffer();
}
