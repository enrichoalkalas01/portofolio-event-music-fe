"use client";

import { useId, useMemo } from "react";

// Components
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Label } from "@/components/shadcn/ui/label";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/shadcn/ui/pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Checkbox } from "@radix-ui/react-checkbox";

// Icons
import { FilterIcon } from "lucide-react";

interface ITableOfTopSectionStatus {
    table: any;
}

export function TableOfTopSectionStatus({ table }: ITableOfTopSectionStatus) {
    const id = useId();

    const selectedStatuses = useMemo(() => {
        const filterValue = table
            .getColumn("status")
            ?.getFilterValue() as string[];
        return filterValue ?? [];
    }, [table.getColumn("status")?.getFilterValue()]);

    const uniqueStatusValues = useMemo(() => {
        const statusColumn = table.getColumn("status");

        if (!statusColumn) return [];

        const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

        return values.sort();
    }, [table.getColumn("status")?.getFacetedUniqueValues()]);

    const statusCounts = useMemo(() => {
        const statusColumn = table.getColumn("status");
        if (!statusColumn) return new Map();
        return statusColumn.getFacetedUniqueValues();
    }, [table.getColumn("status")?.getFacetedUniqueValues()]);

    const handleStatusChange = (checked: boolean, value: string) => {
        const filterValue = table
            .getColumn("status")
            ?.getFilterValue() as string[];
        const newFilterValue = filterValue ? [...filterValue] : [];

        if (checked) {
            newFilterValue.push(value);
        } else {
            const index = newFilterValue.indexOf(value);
            if (index > -1) {
                newFilterValue.splice(index, 1);
            }
        }

        table
            .getColumn("status")
            ?.setFilterValue(
                newFilterValue.length ? newFilterValue : undefined
            );
    };

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <FilterIcon
                            className="-ms-1 opacity-60"
                            size={16}
                            aria-hidden="true"
                        />
                        Status
                        {selectedStatuses.length > 0 && (
                            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                {selectedStatuses.length}
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto min-w-36 p-3" align="start">
                    <div className="space-y-3">
                        <div className="text-muted-foreground text-xs font-medium">
                            Filters
                        </div>
                        <div className="space-y-3">
                            {uniqueStatusValues.map((value: any, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        id={`${id}-${i}`}
                                        checked={selectedStatuses.includes(
                                            value
                                        )}
                                        onCheckedChange={(checked: boolean) =>
                                            handleStatusChange(checked, value)
                                        }
                                    />
                                    <Label
                                        htmlFor={`${id}-${i}`}
                                        className="flex grow justify-between gap-2 font-normal"
                                    >
                                        {value}{" "}
                                        <span className="text-muted-foreground ms-2 text-xs">
                                            {statusCounts.get(value)}
                                        </span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
