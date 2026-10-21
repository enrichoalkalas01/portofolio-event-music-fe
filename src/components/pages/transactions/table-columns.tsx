"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import moment from "moment";

import TableRowAction from "./table-row-action";
import { Badge } from "@/components/shadcn/ui/badge";
import { ConverterCurrency } from "@/utils/currency";
import { TRANSACTION_STATUS_LABEL, transactionStatusClass, type TransactionStatus } from "@/lib/event-status";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "_id",
        header: () => <div>ID</div>,
        cell: ({ row }) => (
            <Link
                href={`/admin/transactions/${row.original?._id}`}
                className="font-mono text-xs hover:text-primary"
                title={row.original?._id}
            >
                {String(row.original?._id || "").slice(-8).toUpperCase()}
            </Link>
        ),
    },
    {
        accessorKey: "event",
        header: () => <div>Event</div>,
        cell: ({ row }) => {
            const event = row.original?.event;
            return (
                <div className="min-w-[200px]">
                    <Link className="font-medium hover:text-primary line-clamp-1" href={`/admin/events/${row.original?.event_id}`}>
                        {event?.title || row.original?.event_id}
                    </Link>
                    {event?.location && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{event.location}</p>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "username",
        header: () => <div>Pembeli</div>,
        cell: ({ row }) => (
            <div className="min-w-[140px]">
                <div className="text-sm">{row.original?.user?.username}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{row.original?.user?.email}</div>
            </div>
        ),
    },
    {
        accessorKey: "total",
        header: () => <div className="text-right">Total</div>,
        cell: ({ row }) => {
            const total = Number(row.original?.request?.total_payment) || 0;
            const qty = row.original?.request?.qty || 1;
            return (
                <div className="text-right tabular-nums whitespace-nowrap">
                    <div>{total > 0 ? ConverterCurrency({ amount: total }) : "-"}</div>
                    <div className="text-xs text-muted-foreground">{qty} tiket</div>
                </div>
            );
        },
    },
    {
        accessorKey: "status_transaction",
        header: () => <div>Status</div>,
        cell: ({ row }) => {
            const status = row.original?.status_transaction as TransactionStatus;
            return (
                <Badge className={transactionStatusClass(status)}>
                    {TRANSACTION_STATUS_LABEL[status] || status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "payment_type",
        header: () => <div>Pembayaran</div>,
        cell: ({ row }) => {
            const settlement = row.original?.settlement;
            return (
                <div className="text-sm whitespace-nowrap">
                    <div className="uppercase">{settlement?.payment_type || "-"}</div>
                    <div className="text-xs text-muted-foreground">
                        {settlement?.settlement_time ? moment(settlement.settlement_time).format("DD MMM YYYY HH:mm") : ""}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div>Dibuat</div>,
        cell: ({ row }) => (
            <div className="text-sm whitespace-nowrap">
                {row.original?.createdAt ? moment(row.original.createdAt).format("DD MMM YYYY HH:mm") : "-"}
            </div>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row, table }) => (
            <div className="flex justify-end">
                <TableRowAction table={table} row={row} />
            </div>
        ),
    },
];
