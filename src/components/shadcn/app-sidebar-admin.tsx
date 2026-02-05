"use client";

import * as React from "react";
import {
    GalleryVerticalEnd,
    Settings,
    Users,
    BanknoteArrowUp,
    FastForward,
    Music,
    File,
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
            plan: "Admin",
        },
    ],
    projects: [
        {
            name: "Events",
            url: "/admin/events",
            icon: Music,
        },
        {
            name: "Coming Soon Events",
            url: "/admin/coming-soons",
            icon: FastForward,
        },
        {
            name: "Transactions",
            url: "/admin/transactions",
            icon: BanknoteArrowUp,
        },
        {
            name: "Users",
            url: "/admin/users",
            icon: Users,
        },
        {
            name: "Files",
            url: "/admin/files",
            icon: File,
        },
        {
            name: "System Params",
            url: "/admin/system-params",
            icon: Settings,
        },
        {
            name: "System Params Type",
            url: "/admin/system-params-type",
            icon: Settings,
        },
    ],
};

export function AppSidebarAdmin({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
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
