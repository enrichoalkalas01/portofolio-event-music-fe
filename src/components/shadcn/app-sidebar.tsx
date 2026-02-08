"use client";

import * as React from "react";
import {
    GalleryVerticalEnd,
    Settings,
    Users,
    BanknoteArrowUp,
    FastForward,
    Music,
    Ticket,
    Bookmark,
    Home,
    CreditCard,
    User,
    Calendar,
} from "lucide-react";

import { NavMain } from "@/components/shadcn/nav-main";
import { NavProjects } from "@/components/shadcn/nav-projects";
import { NavUser } from "@/components/shadcn/nav-user";
import { TeamSwitcher } from "@/components/shadcn/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/shadcn/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Dashboard",
            logo: GalleryVerticalEnd,
            plan: "Users",
        },
    ],
    projects: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            name: "Tiket Saya",
            url: "/dashboard/events",
            icon: Ticket,
        },
        {
            name: "Event Tersimpan",
            url: "/dashboard/events-saved",
            icon: Bookmark,
        },
        {
            name: "Transaksi",
            url: "/dashboard/transactions",
            icon: CreditCard,
        },
        {
            name: "Profil",
            url: "/dashboard/profile",
            icon: User,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
