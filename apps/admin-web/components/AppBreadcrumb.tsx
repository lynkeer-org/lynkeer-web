import type { BreadcrumbItemType } from "@/lib/breadcrumb/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lynkeer/ui/components/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

interface AppBreadcrumbProps {
  items: BreadcrumbItemType[];
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((page, index) => {
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={page.path}>
                <BreadcrumbPage className="text-base font-medium">{page.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <Fragment key={page.path}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link className="text-base font-medium" href={page.path}>
                    {page.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
