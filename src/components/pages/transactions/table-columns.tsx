"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableRowAction from "./table-row-action";
import Link from "next/link";

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
            return <div className="">{row?.original?.user?.username}</div>;
        },
    },
    {
        accessorKey: "event",
        header: () => <div className="">Event</div>,
        cell: ({ row }) => {
            const event = row?.original?.event;
            return (
                <div className="">
                    <Link
                        className="hover:text-primary"
                        href={`/admin/events/${row?.original?.event_id}`}
                    >
                        {event?.title || row?.original?.event_id}
                    </Link>
                    {event?.location && (
                        <p className="text-xs text-muted-foreground">
                            {event.location}
                        </p>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "status_transaction",
        header: () => <div className="">status_transaction</div>,
        cell: ({ row }) => {
            return <div className="">{row?.original?.status_transaction}</div>;
        },
    },
    {
        accessorKey: "settlement_time",
        header: () => <div className="">settlement time</div>,
        cell: ({ row }) => {
            return (
                <div className="">
                    {row?.original?.settlement?.settlement_time || "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: () => <div className="">updatedAt</div>,
        cell: ({ row }) => {
            return <div className="">{row?.original?.updatedAt}</div>;
        },
    },
    {
        accessorKey: "expired_payment_time",
        header: () => <div className="">expired payment time</div>,
        cell: ({ row }) => {
            return (
                <div className="">
                    {`${row?.original?.payment?.expiry?.duration || ""} ${row?.original?.payment?.expiry?.unit || ""}` ||
                        "-"}
                </div>
            );
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
