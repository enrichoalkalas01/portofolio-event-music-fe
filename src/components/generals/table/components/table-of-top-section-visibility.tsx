"use client";

// Components
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";

// Icons
import { Columns3Icon } from "lucide-react";

interface ITableOfTopSectionVisibility {
    table: any;
}

export function TableOfTopSectionVisibility({
    table,
}: ITableOfTopSectionVisibility) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Columns3Icon
                        className="-ms-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                {table
                    .getAllColumns()
                    .filter((column: any) => column.getCanHide())
                    .map((column: any) => {
                        if (
                            column.id !== "select" &&
                            column.id !== "actions" &&
                            column.id !== "expander"
                        ) {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                    onSelect={(event) => event.preventDefault()}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        }
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
