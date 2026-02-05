"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableRowAction from "./table-row-action";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "_id",
        header: () => <div className="">ID</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("_id")}</div>;
        },
    },
    {
        accessorKey: "username",
        header: () => <div className="">username</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("username")}</div>;
        },
    },
    {
        accessorKey: "firstname",
        header: () => <div className="">firstname</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("firstname")}</div>;
        },
    },
    {
        accessorKey: "lastname",
        header: () => <div className="">lastname</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("lastname")}</div>;
        },
    },
    {
        accessorKey: "email",
        header: () => <div className="">email</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("email")}</div>;
        },
    },
    {
        accessorKey: "phonenumber",
        header: () => <div className="">phonenumber</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("phonenumber")}</div>;
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
