import Link from "next/link";
import { MapPin, Ticket } from "lucide-react";

import AvailabilityBadge from "@/components/pages/events/availability-badge";
import { parseEventDate } from "@/lib/parsed-date";
import { getThumbnail } from "@/lib/config";
import type { EventRecord } from "@/lib/event-status";
import { ConverterCurrency } from "@/utils/currency";

export default function EventsItem2({ data }: { data: EventRecord }) {
    const date = parseEventDate(data?.eventDate, { lang: "id" });
    const thumbnail = getThumbnail(data);
    const href = `/events/${data?._id}`;

    return (
        <Link
            href={href}
            className="group relative block w-full rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                    src={thumbnail}
                    alt={data?.title || "Thumbnail event"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                    <AvailabilityBadge event={data} className="backdrop-blur bg-black/40" />
                </div>
                <div className="absolute top-3 right-3 flex flex-col items-center rounded-xl bg-background/90 backdrop-blur px-2.5 py-1.5 text-center shadow">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary leading-none">
                        {date.start.raw.format("MMM")}
                    </span>
                    <span className="text-lg font-bold leading-tight text-foreground tabular-nums">
                        {date.start.date}
                    </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1.5">
                    <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {data?.title}
                    </h3>
                    {data?.location && (
                        <p className="inline-flex items-center gap-1.5 text-xs text-white/75">
                            <MapPin className="size-3.5 shrink-0" />
                            <span className="truncate">{data.location}</span>
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-muted-foreground text-xs">
                    {date.start.day}, {date.start.time} WIB
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                    <Ticket className="size-3.5 text-primary" />
                    {data?.price > 0 ? ConverterCurrency({ amount: data.price }) : "Gratis"}
                </span>
            </div>
        </Link>
    );
}
