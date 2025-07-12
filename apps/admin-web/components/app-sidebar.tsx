"use client";

import {
  IconCamera,
  IconChartBar,
  IconChartBarPopular,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPlayCardStar,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { LogoIcon } from "@lynkeer/ui/components/logoIcon";
import { LogoName } from "@lynkeer/ui/components/logoName";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@lynkeer/ui/components/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "Andres",
    email: "andres.valencia@lynkeer.com",
  },

  navMain: [
    {
      title: "Reportes",
      url: "/reports",
      icon: IconChartBarPopular,
    },
    {
      title: "Tarjetas",
      url: "/passes",
      icon: IconPlayCardStar,
    },
    {
      title: "Datos clientes",
      url: "/clients-data",
      icon: IconUsers,
    },
  ],

  navSecondary: [
    {
      title: "Ayuda",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 flex items-center">
              <Link href="/">
                <LogoIcon className="!size-4.5" />
                <LogoName className="!w-17 !h-4.5" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
