"use client";

import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { ModeToggle } from "@lynkeer/ui/components/modeToggle";
import { Separator } from "@lynkeer/ui/components/separator";
import { SidebarTrigger } from "@lynkeer/ui/components/sidebar";

export function SiteHeader() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <AppBreadcrumb items={breadcrumbs} />

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
