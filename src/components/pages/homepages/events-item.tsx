"use client";

import Link from "next/link";
import { CalendarDays, Clock3, Eye, MapPin, Ticket, Users } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { LoadingComponent } from "@/components/generals/loading/loading";
import AvailabilityBadge from "@/components/pages/events/availability-badge";

import { parseEventDate } from "@/lib/parsed-date";
import { getThumbnail } from "@/lib/config";
import { getAvailability, type EventRecord } from "@/lib/event-status";
import { ConverterCurrency } from "@/utils/currency";
import { useBuyTicket } from "@/hooks/use-buy-ticket";

export default function EventsItem({ data }: { data: EventRecord }) {
    const date = parseEventDate(data?.eventDate, { lang: "id" });
    const thumbnail = getThumbnail(data);
    const availability = getAvailability(data);
    const { buy, isLoading } = useBuyTicket(data?._id);
    const detailHref = `/events/${data?._id}`;

    const isMultiDay = !date.compare.isSameDay;
    const dateLabel = isMultiDay
        ? `${date.start.dateMonth} – ${date.end.dateMonth} ${date.end.year}`
        : `${date.start.day}, ${date.start.dateMonth} ${date.start.year}`;

    return (
        <article className="group w-full rounded-2xl border border-border bg-card/80 hover:bg-card hover:border-primary/40 transition-colors shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[176px_1fr_auto] gap-0 md:gap-6">
                <Link href={detailHref} className="relative block w-full aspect-video md:aspect-square overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={data?.title || "Thumbnail event"}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 md:hidden bg-gradient-to-t from-black/70 to-transparent p-3">
                        <AvailabilityBadge event={data} />
                    </div>
                    <div className="absolute top-3 left-3 flex flex-col items-center justify-center rounded-xl bg-background/90 backdrop-blur px-2.5 py-1.5 text-center shadow">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary leading-none">
                            {date.start.raw.format("MMM")}
                        </span>
                        <span className="text-xl font-bold leading-tight text-foreground tabular-nums">
                            {date.start.date}
                        </span>
                    </div>
                </Link>

                <div className="flex flex-col justify-center gap-2.5 p-4 md:py-5 md:pl-0 min-w-0">
                    <div className="hidden md:flex items-center gap-2 flex-wrap">
                        <AvailabilityBadge event={data} />
                        {data?.categories?.slice(0, 3).map((c) => (
                            <Link
                                key={c}
                                href={`/events?category=${encodeURIComponent(c)}`}
                                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                            >
                                {c}
                            </Link>
                        ))}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold leading-snug text-foreground">
                        <Link href={detailHref} className="hover:text-primary transition-colors line-clamp-2">
                            {data?.title}
                        </Link>
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-4 text-primary" /> {dateLabel}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="size-4 text-primary" /> {date.time.start} WIB
                        </span>
                        {data?.location && (
                            <span className="inline-flex items-center gap-1.5 min-w-0">
                                <MapPin className="size-4 text-primary shrink-0" />
                                <span className="truncate">{data.location}</span>
                            </span>
                        )}
                    </div>

                    {data?.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {data.excerpt}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <Users className="size-3.5" />
                            {availability.isSoldOut
                                ? "Tiket habis"
                                : `${availability.remaining.toLocaleString("id-ID")} tiket tersisa`}
                        </span>
                        {data?.vendor && <span>oleh {data.vendor}</span>}
                    </div>
                </div>

                <div className="flex md:flex-col items-center md:items-stretch justify-between md:justify-center gap-3 px-4 pb-4 md:p-5 md:pl-0 md:w-48 md:border-l md:border-border/60">
                    <div className="flex flex-col md:items-end">
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Mulai dari</span>
                        <span className="text-lg font-bold text-foreground tabular-nums">
                            {data?.price > 0 ? ConverterCurrency({ amount: data.price }) : "Gratis"}
                        </span>
                    </div>
                    <div className="flex md:flex-col gap-2 w-auto md:w-full">
                        <Button
                            disabled={isLoading || !availability.canBuy}
                            onClick={buy}
                            className="cursor-pointer"
                            size="default"
                        >
                            {isLoading ? (
                                <LoadingComponent type="icon" />
                            ) : (
                                <>
                                    <Ticket className="size-4" />
                                    {availability.canBuy ? "Beli Tiket" : availability.label}
                                </>
                            )}
                        </Button>
                        <Button variant="outline" asChild className="cursor-pointer">
                            <Link href={detailHref}>
                                <Eye className="size-4" /> Detail
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
