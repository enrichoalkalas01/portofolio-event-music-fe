"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { useContext } from "react";

// Interfaces
interface ITableOfHeaderMenu {
    column?: any;
    title?: any;
    className?: string;
    disableHideButton?: boolean;
}

export const TableOfHeaderMenu = ({
    column,
    title,
    className,
    disableHideButton,
}: ITableOfHeaderMenu) => {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div
            className={cn(
                "flex justify-center items-center space-x-2 relative",
                className
            )}
        >
            <span className="w-full flex justify-start">{title}</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn(`-ml-3 h-8 flex justify-start`)}
                    >
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDown />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUp />
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-full">
                    <DropdownMenuItem
                        className="w-full"
                        onClick={() => column.toggleSorting(false)}
                    >
                        <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="w-full"
                        onClick={() => column.toggleSorting(true)}
                    >
                        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    {!disableHideButton && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="w-full"
                                onClick={() => column.toggleVisibility(false)}
                            >
                                <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                                Hide
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
