import { errorTypes } from "@/features/registerPass/lib/errorTypes";
import { adminApi } from "@/lib/axios/adminApi";
import { describe, expect, it, vi } from "vitest";
import { addPassToGoogleWalletRequest } from "../addPassToGoogleWalletRequest";

vi.mock("@/lib/axios/adminApi", () => ({
  adminApi: {
    post: vi.fn(),
  },
}));

describe("addPassToGoogleWalletRequest", () => {
  const mockRequest = {
    passUuid: "test-uuid-123",
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      birthDate: "1990-01-01",
      terms: true,
    },
  };

  const expectedPayload = {
    pass_uuid: mockRequest.passUuid,
    user_data: { ...mockRequest.data, os: "android" },
  };

  it("should handle successful request", async () => {
    const mockResponse = {
      status: 201,
      data: {
        url: "https://pay.google.com/mock-save-url",
      },
    };

    vi.mocked(adminApi.post).mockResolvedValueOnce(mockResponse);

    const result = await addPassToGoogleWalletRequest(mockRequest);

    expect(result.status).toBe(201);
    expect(result.data).toEqual(mockResponse.data);
    expect(adminApi.post).toHaveBeenCalledWith("/wallet/google/loyaltyObject", expectedPayload);
  });

  it("should handle error cases", async () => {
    const mockError = new Error("Network error");
    vi.mocked(adminApi.post).mockRejectedValueOnce(mockError);

    const result = await addPassToGoogleWalletRequest(mockRequest);

    expect(result.error).toBeDefined();
    expect(result.error?.code).toBe(errorTypes.ADD_PASS_TO_GOOGLE_WALLET_ERROR);
    expect(result.error?.message).toBe("Network error");
  });
});
