import type { AxiosResponse } from "axios";

type ApiResponse<T> = AxiosResponse<T>;

type ApiType = "private" | "service";

export type { ApiResponse, ApiType };
