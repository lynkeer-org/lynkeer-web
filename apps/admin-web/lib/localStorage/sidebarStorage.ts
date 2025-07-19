import { SIDEBAR_KEYS } from "./keys";
import { storage } from "./storage";

export const sidebarStorage = {
  setIsSidebarOpen: (value: boolean): void => storage.set<boolean>(SIDEBAR_KEYS.IS_SIDEBAR_OPEN, value),
  getIsSidebarOpen: (): boolean | null => storage.get<boolean>(SIDEBAR_KEYS.IS_SIDEBAR_OPEN),
};
