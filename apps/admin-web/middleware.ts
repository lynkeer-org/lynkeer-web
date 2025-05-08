import { auth as authLib } from "@/features/auth/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type AppRouteHandlerFn = (req: NextApiRequest, res: NextApiResponse) => void;

const authMiddleware: AppRouteHandlerFn = authLib.auth;

export { authMiddleware as middleware };
