import { errorTypes } from "@/features/passes/lib/errorTypes";
import { privateApi } from "@/lib/axios/privateApi";
import { describe, expect, it, vi } from "vitest";
import { getPassTemplateListRequest } from "../getPassTemplateListRequest";

vi.mock("@/lib/axios/privateApi", () => ({
  privateApi: {
    get: vi.fn(),
  },
}));

describe("getPassTemplateListRequest", () => {
  it("should handle successful request", async () => {
    const mockResponse = {
      status: 200,
      data: [
        {
          id: "template-1",
          name: "Test Template",
          description: "Test Description",
        },
      ],
    };

    vi.mocked(privateApi.get).mockResolvedValueOnce(mockResponse);

    const result = await getPassTemplateListRequest();
    expect(result.status).toBe(200);
    expect(result.data).toEqual(mockResponse.data);
    expect(privateApi.get).toHaveBeenCalledWith("/v1/pass-template");
  });

  it("should handle error cases", async () => {
    const mockError = new Error("Network error");
    vi.mocked(privateApi.get).mockRejectedValueOnce(mockError);

    const result = await getPassTemplateListRequest();
    expect(result.error).toBeDefined();
    expect(result.error?.code).toBe(errorTypes.GET_PASS_TEMPLATE_LIST_ERROR);
    expect(result.error?.message).toBe("Network error");
  });
});
