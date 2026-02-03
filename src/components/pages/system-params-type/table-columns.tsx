"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableRowAction from "./table-row-action";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "paramsLabel",
        header: () => <div className="">Params Label</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("paramsLabel")}</div>;
        },
    },
    {
        accessorKey: "paramsValue",
        header: () => <div className="">Params Value</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("paramsValue")}</div>;
        },
    },
    {
        accessorKey: "paramsDescription",
        header: () => <div className="">Params Description</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("paramsDescription")}</div>;
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
