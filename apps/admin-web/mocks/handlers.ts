import type { SignInType } from "@/features/auth/types/auth";
import type { CreatePassTemplateType } from "@/features/passes/types/loyaltyPassSchema";
import { http, HttpResponse } from "msw";

const API = process.env.NEXT_PUBLIC_BASE_URL_API;

export const handlers = [
  http.post(`${API}/api/auth/sign-up`, async ({ request }) => {
    const body = (await request.json()) as SignInType;

    if (body.email === "test@lynkeer.com" && body.password === "1234") {
      return HttpResponse.json(null, { status: 201 });
    }

    return HttpResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 409 });
  }),

  http.post(`${API}/api/auth/sign-in`, async ({ request }) => {
    const body = (await request.json()) as SignInType;

    if (body.email === "test@lynkeer.com" && body.password === "1234") {
      return HttpResponse.json(
        { id: "1040735495", firstName: "Andres", email: body.email, accessToken: "test_token" },
        { status: 200 },
      );
    }

    return HttpResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 409 });
  }),

  http.post(`${API}/api/pass/template/create`, async ({ request }) => {
    const body = (await request.json()) as CreatePassTemplateType;

    if (body.title === "test") {
      return HttpResponse.json({ uuid: "1234567890" }, { status: 201 });
    }

    return HttpResponse.json({ error: "PASS_TEMPLATE_ALREADY_EXISTS" }, { status: 409 });
  }),
];
