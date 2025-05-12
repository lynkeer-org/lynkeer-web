import { pageTitles } from "@/lib/utils/pageTitles";
import { usePathname } from "next/navigation";

export function usePageTitle() {
  const pathname = usePathname();

  for (const [path, title] of pageTitles) {
    if (pathname.startsWith(path)) {
      return title;
    }
  }

  return "";
}
