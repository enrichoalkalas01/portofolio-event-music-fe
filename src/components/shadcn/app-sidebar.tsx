"use client";

import * as React from "react";
import Link from "next/link";
import {
    Bookmark,
    CreditCard,
    Home,
    LayoutDashboard,
    Music2,
    Ticket,
    User,
} from "lucide-react";

import { NavProjects } from "@/components/shadcn/nav-projects";
import { NavUser } from "@/components/shadcn/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/shadcn/ui/sidebar";

const MENU = [
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Tiket Saya", url: "/dashboard/events", icon: Ticket },
    { name: "Event Tersimpan", url: "/dashboard/events-saved", icon: Bookmark },
    { name: "Transaksi", url: "/dashboard/transactions", icon: CreditCard },
    { name: "Profil", url: "/dashboard/profile", icon: User },
];

const SHORTCUTS = [
    { name: "Beranda", url: "/", icon: Home, exact: true },
    { name: "Jelajahi Event", url: "/events", icon: Music2 },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Music2 className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Endless<span className="text-primary">Music</span>
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">Akun Saya</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={MENU} />
                <NavProjects projects={SHORTCUTS} label="Pintasan" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
