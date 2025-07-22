// import fs from "node:fs";
// import path from "node:path";
// import { PKPass } from "passkit-generator";
// import { v4 as uuid } from "uuid";

export async function createLoyaltyPass(_storeName: string): Promise<Buffer> {
  // const modelDir = path.join(process.cwd(), "lib/wallets/apple/templates/loyalty.pass");
  // const certsDir = path.join(process.cwd(), "lib/wallets/apple/certificates");

  // const certificates = {
  //   wwdr: fs.readFileSync(path.join(certsDir, "AppleWWDR.pem")),
  //   signerCert: fs.readFileSync(path.join(certsDir, "certificate.pem")),
  //   signerKey: fs.readFileSync(path.join(certsDir, "key.pem")),
  //   signerKeyPassphrase: process.env.APPLE_CERT_PASSWORD || "",
  // };

  // const pass = await PKPass.from({ model: modelDir, certificates });

  // const stripUrl =
  //   "https://lynkeer-web-admin-git-feature-lkr-371961-afvalenciabs-projects.vercel.app/api/wallet/stamps/9/1/stamps.png";
  // const imageResponse = await fetch(stripUrl);

  // const stripImage = await imageResponse.arrayBuffer();

  // pass.addBuffer("strip.png", Buffer.from(stripImage));

  // return await pass.getAsBuffer();
  return Buffer.from("test");
}
