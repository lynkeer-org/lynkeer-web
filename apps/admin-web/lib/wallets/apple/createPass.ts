import path from "node:path";
import { baseAppUrlEnv } from "@/lib/utils/environmentValues";
import {
  appleCertificatePemBase64Env,
  appleKeyPemBase64Env,
  appleWwdrPemBase64Env,
} from "@/lib/utils/environmentValues";
import { PKPass } from "passkit-generator";

export async function createLoyaltyPass(_storeName: string): Promise<Buffer> {
  // Usamos una ruta relativa al propio archivo compilado para que el directorio del
  // template se incluya correctamente en el bundle (especialmente en entornos
  // serverless como Vercel). __dirname apunta a apps/admin-web/lib/wallets/apple/*
  // en el artefacto final, por lo que simplemente navegamos hasta la carpeta
  // "templates/loyalty.pass" que vive junto a este archivo.
  // const modelDir = path.join(__dirname, "templates", "loyalty.pass");

  const certificates = {
    wwdr: Buffer.from(appleWwdrPemBase64Env || "", "base64"),
    signerCert: Buffer.from(appleCertificatePemBase64Env || "", "base64"),
    signerKey: Buffer.from(appleKeyPemBase64Env || "", "base64"),
    signerKeyPassphrase: process.env.APPLE_CERT_PASSWORD || "",
  };

  const pass = await PKPass.from({ model: "./templates/loyalty.pass", certificates });
  // const pass = await PKPass.from({ model: modelDir, certificates });

  const stripUrl = `${baseAppUrlEnv}/api/wallet/stamps/9/1/stamps.png`;
  const imageResponse = await fetch(stripUrl);

  const stripImage = await imageResponse.arrayBuffer();

  pass.addBuffer("strip.png", Buffer.from(stripImage));

  return await pass.getAsBuffer();
}
