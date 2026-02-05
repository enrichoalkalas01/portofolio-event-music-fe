"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableRowAction from "./table-row-action";
import moment from "moment";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: () => <div className="">Title</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("title")}</div>;
        },
    },

    {
        accessorKey: "price",
        header: () => <div className="">price</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("price")}</div>;
        },
    },

    {
        accessorKey: "max_participants",
        header: () => <div className="">max participants</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("max_participants")}</div>;
        },
    },

    {
        accessorKey: "start_date",
        header: () => <div className="">Start Date</div>,
        cell: ({ row }) => {
            return (
                <div className="">
                    {moment(row.original?.eventDate?.start)?.format(
                        "YYYY-MM-DD",
                    )}
                </div>
            );
        },
    },

    {
        accessorKey: "vendor",
        header: () => <div className="">vendor</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("vendor")}</div>;
        },
    },
    {
        accessorKey: "location",
        header: () => <div className="">location</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("location")}</div>;
        },
    },

    {
        accessorKey: "status",
        header: () => <div className="">status</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("status")}</div>;
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
