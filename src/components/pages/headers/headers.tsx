"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LayoutDashboard,
    LogOut,
    Menu,
    Search,
    ShieldCheck,
    Ticket,
    User,
} from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/config";

const NAV_LINKS = [
    { href: "/", label: "Beranda" },
    { href: "/events", label: "Event" },
    { href: "/events/coming-soon", label: "Segera Hadir" },
    { href: "/about-us", label: "Tentang" },
    { href: "/contact-us", label: "Kontak" },
];

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

export default function Headers() {
    const router = useRouter();
    const pathname = usePathname() ?? "/";
    const session: any = useSession();
    const user = session?.data?.user;
    const isAuthenticated = session?.status === "authenticated";
    const isAdmin = ADMIN_ROLES.includes(user?.role);

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname === href || (href !== "/events" && pathname.startsWith(href)) || (href === "/events" && pathname.startsWith("/events") && !pathname.startsWith("/events/coming-soon"));

    const Brand = (
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={SITE_NAME}>
            <img
                width={32}
                height={32}
                src="/logo.png"
                className="brightness-0 invert w-8 h-8"
                alt=""
            />
            <span className="font-bold tracking-tight text-base hidden sm:inline">
                Endless<span className="text-primary">Music</span>
            </span>
        </Link>
    );

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-colors duration-300",
                scrolled
                    ? "bg-background/85 backdrop-blur-md border-border"
                    : "bg-background/40 backdrop-blur-sm border-transparent",
            )}
        >
            <div className="w-full max-w-7xl mx-auto h-16 px-4 flex items-center gap-4">
                {Brand}

                <nav className="hidden lg:flex items-center gap-1 mx-auto" aria-label="Navigasi utama">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive(link.href)
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                            )}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <span className="absolute left-3.5 right-3.5 -bottom-[1px] h-0.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:inline-flex text-muted-foreground"
                        aria-label="Cari event"
                        onClick={() => router.push("/events")}
                    >
                        <Search className="size-4" />
                    </Button>

                    {!isAuthenticated ? (
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Masuk</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Daftar</Link>
                            </Button>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="flex items-center gap-2 rounded-full border border-border pl-1 pr-3 py-1 hover:bg-accent/60 transition-colors cursor-pointer"
                                    aria-label="Menu akun"
                                >
                                    <Avatar className="size-7">
                                        <AvatarImage src={user?.avatar || undefined} alt="" />
                                        <AvatarFallback className="text-[11px] bg-primary/20 text-primary">
                                            {getInitials(user?.name || user?.username)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium max-w-[120px] truncate hidden sm:inline">
                                        {user?.name || user?.username}
                                    </span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="flex flex-col">
                                    <span className="truncate">{user?.name || user?.username}</span>
                                    <span className="text-xs font-normal text-muted-foreground truncate">
                                        {user?.email}
                                    </span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer">
                                    <LayoutDashboard /> Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/dashboard/events")} className="cursor-pointer">
                                    <Ticket /> Tiket Saya
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/dashboard/profile")} className="cursor-pointer">
                                    <User /> Profil
                                </DropdownMenuItem>
                                {isAdmin && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer">
                                            <ShieldCheck /> Panel Admin
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="cursor-pointer text-rose-400 focus:text-rose-400"
                                >
                                    <LogOut /> Keluar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Buka menu">
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[360px]">
                            <SheetHeader>
                                <SheetTitle className="text-left">{SITE_NAME}</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-4" aria-label="Navigasi mobile">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                            isActive(link.href)
                                                ? "bg-primary/15 text-primary"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                            {!isAuthenticated && (
                                <div className="mt-auto px-4 pb-6 flex flex-col gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href="/login">Masuk</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href="/register">Daftar Gratis</Link>
                                    </Button>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
