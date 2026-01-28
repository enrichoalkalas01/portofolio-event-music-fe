"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/shadcn/ui/button";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

import { TableOfHeaderMenu } from "./table-of-header-menu";

export const columnsTable: ColumnDef<any>[] = [
    {
        id: "expander",
        header: ({ column }: { column: any }) => (
            <TableOfHeaderMenu column={column} title="" className="" />
        ),
        cell: ({ row }) => {
            return row.getCanExpand() ? (
                <div className="flex justify-center items-center">
                    <Button
                        {...{
                            className:
                                "size-7 shadow-none text-muted-foreground",
                            onClick: row.getToggleExpandedHandler(),
                            "aria-expanded": row.getIsExpanded(),
                            "aria-label": row.getIsExpanded()
                                ? `Collapse details for ${row.original.name}`
                                : `Expand details for ${row.original.name}`,
                            size: "icon",
                            variant: "ghost",
                        }}
                    >
                        {row.getIsExpanded() ? (
                            <ChevronUpIcon
                                className="opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                        ) : (
                            <ChevronDownIcon
                                className="opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                </div>
            ) : undefined;
        },
    },
    {
        id: "select",
        header: ({ table }) => (
            <div className="w-full flex justify-center items-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="w-full flex justify-center items-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
    },
    {
        id: "name",
        accessorKey: "name",
        sortUndefined: "last",
        sortDescFirst: false,
        header: ({ column }: { column: any }) => (
            <TableOfHeaderMenu column={column} title="Name" />
        ),
        cell: ({ row }) => (
            <div className="truncate font-medium">{row.getValue("name")}</div>
        ),
    },
    {
        id: "email",
        accessorKey: "email",
        header: ({ column }: { column: any }) => (
            <TableOfHeaderMenu column={column} title="Email" />
        ),
    },
    {
        id: "location",
        accessorKey: "location",
        header: ({ column }: { column: any }) => (
            <TableOfHeaderMenu column={column} title="Location" />
        ),
        cell: ({ row }) => (
            <div className="truncate">
                <span className="text-lg leading-none">
                    {row.original.flag}
                </span>{" "}
                {row.getValue("location")}
            </div>
        ),
    },
    {
        id: "status",
        accessorKey: "status",
        header: ({ column }: { column: any }) => (
            <TableOfHeaderMenu column={column} title="Status" />
        ),
    },
    {
        id: "balance",
        accessorKey: "balance",
        header: ({ column }: { column: any }) => (
            <TableOfHeaderMenu column={column} title="Balance" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("balance"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return formatted;
        },
    },
];
