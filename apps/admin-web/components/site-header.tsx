"use client";

import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { sidebarStorage } from "@/lib/localStorage/sidebarStorage";
import { ModeToggle } from "@lynkeer/ui/components/modeToggle";
import { Separator } from "@lynkeer/ui/components/separator";
import { SidebarTrigger, useSidebar } from "@lynkeer/ui/components/sidebar";
import { useEffect } from "react";

export function SiteHeader() {
  const { open, setOpen } = useSidebar();
  const { breadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    const isSidebarOpen = sidebarStorage.getIsSidebarOpen();
    setOpen(isSidebarOpen ?? true);
  }, [setOpen]);

  const handleToggleSidebar = () => {
    sidebarStorage.setIsSidebarOpen(!open);
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" onClick={handleToggleSidebar} />

        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <AppBreadcrumb items={breadcrumbs} />

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
