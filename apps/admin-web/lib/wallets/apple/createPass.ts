import fs from "node:fs";
import path from "node:path";
import type { AppleLoyaltyPassData, AppleLoyaltyUserType } from "@/features/passes/types/loyaltyPassSchema";
import {
  appleCertPasswordEnv,
  appleCertificatePemBase64Env,
  appleKeyPemBase64Env,
  appleWwdrPemBase64Env,
} from "@/lib/utils/environmentValues";
import {
  appleAuthenticationTokenEnv,
  appleTeamIdentifierEnv,
  appleWebServiceURLEnv,
} from "@/lib/utils/environmentValues";
import { v4 as uuidv4 } from "uuid";

export async function createLoyaltyPass(
  objectData: AppleLoyaltyUserType,
): Promise<{ pass: Buffer; passData: AppleLoyaltyPassData }> {
  const { PKPass } = await import("passkit-generator");
  const certificates = {
    wwdr: Buffer.from(appleWwdrPemBase64Env || "", "base64"),
    signerCert: Buffer.from(appleCertificatePemBase64Env || "", "base64"),
    signerKey: Buffer.from(appleKeyPemBase64Env || "", "base64"),
    signerKeyPassphrase: appleCertPasswordEnv || "",
  };

  const iconPath = path.join(process.cwd(), "lib", "wallets", "apple", "defaultAssets", "icon.png");
  const icon2xPath = path.join(process.cwd(), "lib", "wallets", "apple", "defaultAssets", "icon@2x.png");
  const logoPath = path.join(process.cwd(), "lib", "wallets", "apple", "defaultAssets", "logo.png");

  // Read image files as buffers
  const iconBuffer = fs.readFileSync(iconPath);
  const icon2xBuffer = fs.readFileSync(icon2xPath);
  const logoBuffer = fs.readFileSync(logoPath);

  const stripUrl = objectData.urlImageStamps;
  const imageResponse = await fetch(stripUrl);
  const stripImage = await imageResponse.arrayBuffer();

  const assets = {
    "strip.png": Buffer.from(stripImage),
    "icon.png": iconBuffer,
    "icon@2x.png": icon2xBuffer,
    "logo.png": logoBuffer,
  };

  const passData: AppleLoyaltyPassData = {
    passTypeIdentifier: "pass.com.lynkeer",
    serialNumber: uuidv4(),
    teamIdentifier: appleTeamIdentifierEnv || "",
    organizationName: objectData.title,
    description: `Tarjeta de fidelidad de ${objectData.title}`,
    logoText: objectData.title,
    foregroundColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(0, 0, 0)",
    webServiceURL: appleWebServiceURLEnv || "",
    authenticationToken: appleAuthenticationTokenEnv || "",
    sharingProhibited: false,
  };

  const pass = new PKPass({ ...assets }, certificates, { formatVersion: 1, ...passData });

  // Set barcode using the proper method
  pass.setBarcodes({
    message: objectData.customerId,
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
    altText: "by Lynkeer",
  });

  // Add secondary fields
  pass.type = "storeCard";
  pass.secondaryFields.push(
    {
      key: "stamps",
      label: "Sellos",
      value: objectData.stamps,
    },
    {
      key: "rewards",
      label: "Premios disponibles",
      value: objectData.rewards,
      textAlignment: "PKTextAlignmentRight",
    },
  );

  return { pass: pass.getAsBuffer(), passData };
}
