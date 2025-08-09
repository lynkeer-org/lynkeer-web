"use client";

import { IconChartBarPopular, IconHelp, IconPlayCardStar, IconUsers } from "@tabler/icons-react";
import type * as React from "react";

import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import { NavUser } from "@/components/NavUser";
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
import type { User } from "next-auth";
import Link from "next/link";

const data = {
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

interface AppSidebarProps {
  user: User;
  variant?: "sidebar" | "floating" | "inset";
  side?: "left" | "right";
  collapsible?: "none" | "icon" | "offcanvas";
  className?: string;
}

export function AppSidebar({ user, variant, side, collapsible = "icon", className }: AppSidebarProps) {
  return (
    <Sidebar collapsible={collapsible} variant={variant} side={side} className={className}>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
