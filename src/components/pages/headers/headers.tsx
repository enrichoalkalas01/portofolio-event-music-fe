import Image from "next/image";
import Link from "next/link";

import { User } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/shadcn/ui/navigation-menu";
import { Button } from "@/components/shadcn/ui/button";

export default function Headers() {
    return (
        <div className="w-full max-w-full bg-foreground/90 relative">
            <div className="w-full md:max-w-5xl lg:max-w-7xl items-center py-4 px-4 text-background flex gap-4 mx-auto">
                <div className="logo w-1/4 text-md">
                    <h1>Event Nations</h1>
                </div>
                <div className="menus w-full text-xl">
                    <NavigationMenu className="mx-auto">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={""}
                                        className="px-4 py-2 text-sm font-medium text-background transition-colors duration-200 uppercase text-xs"
                                    >
                                        Events
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={""}
                                        className="px-4 py-2 text-sm font-medium text-background transition-colors duration-200 uppercase text-xs"
                                    >
                                        Coming Soon
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={""}
                                        className="px-4 py-2 text-sm font-medium text-background transition-colors duration-200 uppercase text-xs"
                                    >
                                        About Us
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={""}
                                        className="px-4 py-2 text-sm font-medium text-background transition-colors duration-200 uppercase text-xs"
                                    >
                                        Contact Us
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="users w-auto text-xl">
                    <Button className="cursor-pointer" variant="ghost">
                        <User className="w-5 lg:w-6 h-5 lg:h-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
