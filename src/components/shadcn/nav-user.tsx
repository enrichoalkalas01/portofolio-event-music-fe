"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, Home, LogOut, ShieldCheck, User } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/shadcn/ui/sidebar";

const ADMIN_ROLES = ["admin", "super_admin"];

function getInitials(name?: string) {
    if (!name) return "U";
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("");
}

export function NavUser() {
    const session: any = useSession();
    const router = useRouter();
    const { isMobile } = useSidebar();

    const user = session?.data?.user;
    const name: string = user?.name || user?.username || "Pengguna";
    const isAdmin = ADMIN_ROLES.includes(user?.role);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.avatar || undefined} alt="" />
                                <AvatarFallback className="rounded-lg bg-primary/20 text-primary text-xs">
                                    {getInitials(name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user?.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="flex flex-col">
                            <span className="truncate">{name}</span>
                            <span className="text-xs font-normal text-muted-foreground capitalize">
                                {user?.role || "user"}
                            </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/")}>
                            <Home /> Ke Beranda
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/dashboard/profile")}>
                            <User /> Profil
                        </DropdownMenuItem>
                        {isAdmin && (
                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/admin")}>
                                <ShieldCheck /> Panel Admin
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-rose-400 focus:text-rose-400"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut /> Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
