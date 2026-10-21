"use client";

import * as React from "react";
import Link from "next/link";
import {
    BanknoteArrowUp,
    FastForward,
    File,
    Home,
    LayoutDashboard,
    Music,
    Settings,
    ShieldCheck,
    Users,
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

const MAIN = [
    { name: "Ringkasan", url: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Event", url: "/admin/events", icon: Music },
    { name: "Segera Hadir", url: "/admin/coming-soons", icon: FastForward },
    { name: "Transaksi", url: "/admin/transactions", icon: BanknoteArrowUp },
    { name: "Pengguna", url: "/admin/users", icon: Users },
    { name: "File", url: "/admin/files", icon: File },
];

const SETTINGS = [
    { name: "System Params", url: "/admin/system-params", icon: Settings },
    { name: "Tipe System Params", url: "/admin/system-params-type", icon: Settings },
];

const SHORTCUTS = [
    { name: "Dashboard Pengguna", url: "/dashboard", icon: Home, exact: true },
];

export function AppSidebarAdmin({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <ShieldCheck className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Endless<span className="text-primary">Music</span>
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">Panel Admin</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={MAIN} label="Kelola" />
                <NavProjects projects={SETTINGS} label="Pengaturan" />
                <NavProjects projects={SHORTCUTS} label="Pintasan" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
