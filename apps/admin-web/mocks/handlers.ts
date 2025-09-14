import type { SignInType } from "@/features/auth/types/auth";
import type { CreateCustomerRequest } from "@/features/customer/types/customer";
import type { CreateCustomerPassRequest } from "@/features/customer/types/customerPass";
import type { PassTemplateType } from "@/features/passes/types/loyaltyPassSchema";
import { baseUrlApiEnv } from "@/lib/utils/environmentValues";
import { http, HttpResponse } from "msw";

const API = baseUrlApiEnv;

export const handlers = [
  http.post(`${API}/api/v1/auth/signup`, async ({ request }) => {
    const body = (await request.json()) as SignInType;

    if (body.email === "test@lynkeer.com" && body.password === "1234") {
      return HttpResponse.json(null, { status: 201 });
    }

    return HttpResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 409 });
  }),

  http.post(`${API}/api/v1/auth/signin`, async ({ request }) => {
    const body = (await request.json()) as SignInType;

    if (body.email === "test@lynkeer.com" && body.password === "1234") {
      return HttpResponse.json(
        { id: "1040735495", firstName: "Andres", email: body.email, accessToken: "test_token" },
        { status: 200 },
      );
    }

    return HttpResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 409 });
  }),

  http.post(`${API}/api/v1/pass/template/create`, async ({ request }) => {
    const body = (await request.json()) as PassTemplateType;

    if (body.title === "test") {
      return HttpResponse.json({ uuid: "1234567890" }, { status: 201 });
    }

    return HttpResponse.json({ error: "PASS_TEMPLATE_ALREADY_EXISTS" }, { status: 409 });
  }),

  http.post(`${API}/api/v1/customer`, async ({ request }) => {
    const body = (await request.json()) as CreateCustomerRequest;

    if (body.email === "test@customer.com") {
      return HttpResponse.json({ error: "CUSTOMER_ALREADY_EXISTS" }, { status: 409 });
    }

    const mockCustomer = {
      id: `customer-${Math.random().toString(36).substring(2, 15)}`,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      birthDate: body.birthDate,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(mockCustomer, { status: 201 });
  }),

  http.get(`${API}/api/v1/customers/email/:email`, ({ params }) => {
    const { email } = params;

    if (email === "test@customer.com") {
      return HttpResponse.json(
        {
          id: "customer-test123",
          firstName: "Test",
          lastName: "Customer",
          phone: "+1234567890",
          email: "test@customer.com",
          birthDate: "1990-01-01",
          createdAt: "2025-09-14T00:00:00.000Z",
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(null, { status: 404 });
  }),

  http.post(`${API}/api/v1/customer-pass`, async ({ request }) => {
    const body = (await request.json()) as CreateCustomerPassRequest;

    const mockCustomerPass = {
      ...body,
      id: `pass-${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(mockCustomerPass, { status: 201 });
  }),
];
