"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar";

export function NavProjects({
    projects,
    label = "Menu",
}: {
    projects: {
        name: string;
        url: string;
        icon: LucideIcon;
        exact?: boolean;
    }[];
    label?: string;
}) {
    const pathname = usePathname() ?? "/";

    const isActive = (item: { url: string; exact?: boolean }) =>
        item.exact ? pathname === item.url : pathname === item.url || pathname.startsWith(`${item.url}/`);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive={isActive(item)} tooltip={item.name}>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
