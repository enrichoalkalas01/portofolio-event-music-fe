"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import moment from "moment";

import TableRowAction from "./table-row-action";
import { Badge } from "@/components/shadcn/ui/badge";
import { getThumbnail } from "@/lib/config";
import { EVENT_STATUS_LABEL, eventStatusClass, type EventStatus } from "@/lib/event-status";
import { ConverterCurrency } from "@/utils/currency";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: () => <div>Event</div>,
        cell: ({ row }) => {
            const event = row.original;
            return (
                <div className="flex items-center gap-3 min-w-[260px]">
                    <img
                        src={getThumbnail(event)}
                        alt=""
                        className="size-10 rounded-md object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                        <Link
                            href={`/admin/events/${event?._id}`}
                            className="font-medium hover:text-primary line-clamp-1"
                        >
                            {event?.title}
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                            {event?.location || "-"}
                            {event?.vendor ? ` · ${event.vendor}` : ""}
                        </p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "start_date",
        header: () => <div>Jadwal</div>,
        cell: ({ row }) => {
            const start = row.original?.eventDate?.start;
            const end = row.original?.eventDate?.end;
            return (
                <div className="text-sm whitespace-nowrap">
                    <div>{start ? moment(start).format("DD MMM YYYY") : "-"}</div>
                    <div className="text-xs text-muted-foreground">
                        {start ? moment(start).format("HH:mm") : ""}
                        {end ? ` – ${moment(end).format("HH:mm")}` : ""}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Harga</div>,
        cell: ({ row }) => {
            const price = Number(row.getValue("price")) || 0;
            return (
                <div className="text-right tabular-nums whitespace-nowrap">
                    {price > 0 ? ConverterCurrency({ amount: price }) : "Gratis"}
                </div>
            );
        },
    },
    {
        accessorKey: "tickets_sold",
        header: () => <div className="text-right">Tiket</div>,
        cell: ({ row }) => {
            const sold = row.original?.tickets_sold ?? 0;
            const capacity = row.original?.max_participants ?? 0;
            const percent = capacity > 0 ? Math.round((sold / capacity) * 100) : 0;
            return (
                <div className="text-right tabular-nums whitespace-nowrap">
                    <div>
                        {sold.toLocaleString("id-ID")} / {capacity.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-muted-foreground">{percent}% terjual</div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => <div>Status</div>,
        cell: ({ row }) => {
            const status = row.getValue("status") as EventStatus;
            const comingSoon = row.original?.others?.coming_soon === "YES";
            return (
                <div className="flex flex-col gap-1 items-start">
                    <Badge className={eventStatusClass(status)}>
                        {EVENT_STATUS_LABEL[status] || status}
                    </Badge>
                    {comingSoon && (
                        <Badge variant="outline" className="text-[10px]">
                            Segera hadir
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row, table }) => {
            return (
                <div className="flex justify-end">
                    <TableRowAction table={table} row={row} />
                </div>
            );
        },
    },
];
