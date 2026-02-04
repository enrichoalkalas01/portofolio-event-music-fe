"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableRowAction from "./table-row-action";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: () => <div className="">Title</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("title")}</div>;
        },
    },

    {
        accessorKey: "tra",
        header: () => <div className="">Actions</div>,
        cell: ({ row, table }) => {
            return (
                <div className="">
                    <TableRowAction table={table} row={row} />
                </div>
            );
        },
    },
];
