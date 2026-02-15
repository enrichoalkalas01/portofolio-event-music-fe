"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { MoreHorizontal, User } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/shadcn/ui/navigation-menu";
import { Button } from "@/components/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Headers() {
    const router = useRouter();
    const session: any = useSession();
    const username: any = session?.data?.user?.username || null;
    const userID = session?.data?.user?.id;

    return (
        <div className="w-full max-w-full relative">
            <div className="w-full md:max-w-5xl lg:max-w-7xl items-center py-4 px-4 flex gap-4 mx-auto">
                <div className="logo w-1/4 text-md">
                    <Link href={"/"}>
                        <img
                            width={35}
                            height={35}
                            src="/logo.png"
                            className="brightness-0 invert"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="menus w-full text-xl">
                    <NavigationMenu className="mx-auto">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={"/events"}
                                        className="px-4 py-2 text-sm font-medium transition-colors duration-200 uppercase text-xs"
                                    >
                                        Events
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={"/events/coming-soon"}
                                        className="px-4 py-2 text-sm font-medium transition-colors duration-200 uppercase text-xs"
                                    >
                                        Coming Soon
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={"/about-us"}
                                        className="px-4 py-2 text-sm font-medium transition-colors duration-200 uppercase text-xs"
                                    >
                                        About Us
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={"/contact-us"}
                                        className="px-4 py-2 text-sm font-medium transition-colors duration-200 uppercase text-xs"
                                    >
                                        Contact Us
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="users w-auto text-xl">
                    {!username ? (
                        <Link href="/login">
                            <Button className="cursor-pointer" variant="ghost">
                                <span>Sign In / Sign Up</span>
                                <User className="w-5 lg:w-6 h-5 lg:h-6" />
                            </Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                className="cursor-pointer"
                            >
                                <Button variant="outline" className="">
                                    <span>{username}</span>
                                    <User className="w-5 lg:w-6 h-5 lg:h-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => router.push(`/dashboard`)}
                                    className="cursor-pointer"
                                >
                                    Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(`/dashboard/profile`)
                                    }
                                    className="cursor-pointer"
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="cursor-pointer"
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </div>
    );
}
