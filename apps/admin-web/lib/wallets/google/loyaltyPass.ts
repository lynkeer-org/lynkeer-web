import { google } from "googleapis";
import jwt from "jsonwebtoken";

import type { LoyaltyPassType } from "@/features/passes/types/loyaltyPassSchema";
import type { walletobjects_v1 } from "googleapis";

export class LoyaltyPass {
  private credentials: {
    client_email: string;
    private_key: string;
  };

  private client: walletobjects_v1.Walletobjects;
  private issuerId: string;

  constructor() {
    const clientEmail = process.env.GOOGLE_WALLET_CLIENT_EMAIL as string;
    const privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY?.replace(/\\n/g, "\n") as string;

    this.credentials = {
      client_email: clientEmail,
      private_key: privateKey,
    };

    this.issuerId = process.env.GOOGLE_WALLET_ISSUER_ID as string;

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
    });

    this.client = google.walletobjects({ version: "v1", auth });
  }

  async createClass(passData: LoyaltyPassType, classSuffix: string): Promise<string> {
    const classId = `${this.issuerId}.${classSuffix}`;

    try {
      await this.client.loyaltyclass.get({ resourceId: classId });
      return classId;

      // biome-ignore lint/suspicious/noExplicitAny: <Access to error response>
    } catch (err: any) {
      if (err.response && err?.response?.status !== 404) {
        return classId;
      }
    }

    const newClass: walletobjects_v1.Schema$LoyaltyClass = {
      id: classId,
      issuerName: passData.passName,
      programName: passData.passName,
      reviewStatus: "UNDER_REVIEW",
      programLogo: {
        sourceUri: {
          uri: passData.logoUrl,
        },
        contentDescription: {
          defaultValue: {
            language: "en-US",
            value: "Pass logo",
          },
        },
      },
      hexBackgroundColor: passData.backgroundColor,
    };

    await this.client.loyaltyclass.insert({
      requestBody: newClass,
    });

    return classId;
  }

  formatObjectForWallet(user: {
    objectSuffix: string;
    classId: string;
    name: string;
    email: string;
    urlImageStamps: string;
    stamps: number;
  }): walletobjects_v1.Schema$LoyaltyObject {
    return {
      id: `${this.issuerId}.${user.objectSuffix}`,
      classId: user.classId,
      state: "ACTIVE",
      accountId: user.email,
      accountName: user.name,
      loyaltyPoints: {
        label: "Sellos",
        balance: { int: user.stamps },
      },
      secondaryLoyaltyPoints: {
        label: "Premios disponibles",
        balance: { int: 2 },
      },
      barcode: {
        type: "qrCode",
        value: user.objectSuffix,
      },
      textModulesData: [
        {
          header: "Tu progreso",
          body: `Has juntado ${user.stamps} sellos.`,
        },
      ],
      heroImage: {
        sourceUri: {
          uri: user.urlImageStamps,
        },
        contentDescription: {
          defaultValue: {
            language: "en-US",
            value: "Sellos",
          },
        },
      },
    };
  }

  generateAddToWalletJwt(objectData: walletobjects_v1.Schema$LoyaltyObject): string {
    const claims = {
      iss: this.credentials.client_email,
      aud: "google",
      origins: ["https://yourdomain.com"],
      typ: "savetowallet",
      payload: {
        loyaltyObjects: [objectData],
      },
    };

    return jwt.sign(claims, this.credentials.private_key, { algorithm: "RS256" });
  }

  generateSaveLink(token: string): string {
    return `https://pay.google.com/gp/v/save/${token}`;
  }
}
