import type { BreadcrumbItemType } from "@/lib/breadcrumb/types";
import { Breadcrumb } from "@lynkeer/ui/components/breadcrumb";
import { ScrollableBreadcrumbList } from "./ScrollableBreadcrumbList";

interface AppBreadcrumbProps {
  items: BreadcrumbItemType[];
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <ScrollableBreadcrumbList items={items} />
    </Breadcrumb>
  );
}
