"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, QrCode, Ticket } from "lucide-react";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import EmptyState from "@/components/generals/empty-state";
import { Card } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { api, getErrorMessage } from "@/lib/api";
import { getThumbnail } from "@/lib/config";
import { parseEventDate } from "@/lib/parsed-date";
import { useAccessToken } from "@/hooks/use-access-token";

export default function Page() {
    const { accessToken } = useAccessToken();

    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard-user-events"],
        queryFn: () => api<any[]>("/transactions", { token: accessToken, query: { status: "success", size: 100 } }),
        enabled: !!accessToken,
    });

    const tickets = data?.data ?? [];
    const now = new Date();
    const upcoming = tickets.filter((t) => !t?.event?.eventDate?.end || new Date(t.event.eventDate.end) >= now);
    const past = tickets.filter((t) => t?.event?.eventDate?.end && new Date(t.event.eventDate.end) < now);

    const TicketCard = ({ transaction, isPast }: { transaction: any; isPast?: boolean }) => {
        const event = transaction?.event;
        const date = event?.eventDate ? parseEventDate(event.eventDate, { lang: "id" }) : null;
        return (
            <Link href={`/dashboard/transactions/${transaction?._id}`}>
                <Card className={`overflow-hidden p-0 gap-0 hover:border-primary/40 transition-colors h-full ${isPast ? "opacity-70" : ""}`}>
                    <div className="relative h-40">
                        <img src={getThumbnail(event)} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                            <h3 className="font-bold text-white line-clamp-2 leading-snug">{event?.title || "Event"}</h3>
                            <Badge className={isPast ? "bg-muted text-muted-foreground" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"}>
                                {isPast ? "Selesai" : "Aktif"}
                            </Badge>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                            <Calendar className="size-4 text-primary" />
                            {date ? `${date.start.day}, ${date.start.dateMonth} ${date.start.year} · ${date.time.start} WIB` : "-"}
                        </span>
                        {event?.location && (
                            <span className="inline-flex items-center gap-2">
                                <MapPin className="size-4 text-primary" />
                                <span className="line-clamp-1">{event.location}</span>
                            </span>
                        )}
                        <span className="inline-flex items-center gap-2 text-xs">
                            <QrCode className="size-4 text-primary" />
                            {transaction?.request?.qty || 1} tiket · ID {transaction?._id?.slice(-8).toUpperCase()}
                        </span>
                    </div>
                </Card>
            </Link>
        );
    };

    return (
        <section className="w-full flex flex-col gap-6">
            <WrapperCard
                headerStatus
                headerTitle="Tiket Saya"
                headerSubTitle="E-ticket dari pembelian yang sudah berhasil dibayar"
                className="p-0 gap-0"
            >
                {isLoading ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-64 w-full" />
                        ))}
                    </div>
                ) : error ? (
                    <EmptyState title="Gagal memuat tiket" description={getErrorMessage(error)} />
                ) : tickets.length === 0 ? (
                    <EmptyState
                        icon={Ticket}
                        title="Belum ada tiket"
                        description="Kamu belum memiliki tiket event. Mulai jelajahi event musik yang tersedia!"
                        action={
                            <Button asChild>
                                <Link href="/events">Jelajahi Event</Link>
                            </Button>
                        }
                    />
                ) : (
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold">Akan datang ({upcoming.length})</h3>
                            {upcoming.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Tidak ada tiket untuk event mendatang.</p>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {upcoming.map((t) => (
                                        <TicketCard key={t._id} transaction={t} />
                                    ))}
                                </div>
                            )}
                        </div>
                        {past.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-muted-foreground">Sudah lewat ({past.length})</h3>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {past.map((t) => (
                                        <TicketCard key={t._id} transaction={t} isPast />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </WrapperCard>
        </section>
    );
}
