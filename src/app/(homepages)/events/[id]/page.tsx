"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
    Building2,
    CalendarDays,
    CalendarX2,
    ChevronRight,
    Clock3,
    Loader2,
    MapPin,
    Share2,
    Star,
    Ticket,
    Users,
} from "lucide-react";

import EventsItem2 from "@/components/pages/homepages/events-item-2";
import AvailabilityBadge from "@/components/pages/events/availability-badge";
import EmptyState from "@/components/generals/empty-state";
import SectionHeader from "@/components/generals/section-header";
import { EventDetailSkeleton } from "@/components/pages/events/event-skeletons";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { Button } from "@/components/shadcn/ui/button";
import { Progress } from "@/components/shadcn/ui/progress";

import { api, ApiError, getErrorMessage } from "@/lib/api";
import { getImageUrl, getThumbnail } from "@/lib/config";
import { getAvailability, type EventRecord } from "@/lib/event-status";
import { parseEventDate } from "@/lib/parsed-date";
import { ConverterCurrency } from "@/utils/currency";
import { useBuyTicket } from "@/hooks/use-buy-ticket";
import { cn } from "@/lib/utils";

export default function Page() {
    const params = useParams<{ id: string }>();
    const session: any = useSession();
    const accessToken: string | undefined = session?.data?.user?.token?.access_token;
    const queryClient = useQueryClient();

    const [isSaved, setIsSaved] = useState(false);
    const [isLoadingSaved, setIsLoadingSaved] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ["event-detail", params?.id],
        queryFn: () => api<EventRecord>(`/events/${params?.id}`, { token: accessToken }),
        enabled: !!params?.id,
        retry: (count, err) => !(err instanceof ApiError && err.status === 404) && count < 2,
    });

    const { data: savedStatus } = useQuery({
        queryKey: ["saved-check", params?.id],
        queryFn: () => api<{ isSaved: boolean }>(`/saved/check/${params?.id}`, { token: accessToken }),
        enabled: !!accessToken && !!params?.id,
    });

    useEffect(() => {
        if (savedStatus?.data?.isSaved !== undefined) setIsSaved(savedStatus.data.isSaved);
    }, [savedStatus]);

    const event = data?.data;
    const { buy, isLoading: isLoadingTicket } = useBuyTicket(event?._id);

    useEffect(() => {
        if (event?.title) document.title = `${event.title} | Endless Event Music`;
    }, [event?.title]);

    const handleShare = async () => {
        const shareData = {
            title: event?.title || "Event",
            text: `Lihat event ini: ${event?.title}`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Tautan disalin ke clipboard");
            }
        } catch (err: any) {
            if (err?.name !== "AbortError") toast.error("Gagal membagikan tautan");
        }
    };

    const handleSaveFavorite = async () => {
        if (!accessToken) {
            toast.info("Masuk terlebih dahulu untuk menyimpan event.");
            return;
        }
        setIsLoadingSaved(true);
        try {
            const response = await api<{ isSaved: boolean }>(`/saved/${params?.id}`, {
                method: "POST",
                token: accessToken,
            });
            setIsSaved(response.data.isSaved);
            toast.success(response.data.isSaved ? "Event disimpan ke favorit" : "Event dihapus dari favorit");
            queryClient.invalidateQueries({ queryKey: ["saved-check", params?.id] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-saved-events"] });
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setIsLoadingSaved(false);
        }
    };

    if (isLoading) return <EventDetailSkeleton />;

    if (error || !event) {
        const notFound = error instanceof ApiError && error.status === 404;
        return (
            <div className="w-full max-w-3xl mx-auto px-4 py-20">
                <EmptyState
                    icon={CalendarX2}
                    title={notFound ? "Event tidak ditemukan" : "Gagal memuat event"}
                    description={
                        notFound
                            ? "Event ini mungkin sudah dihapus atau tautannya salah."
                            : "Terjadi gangguan saat mengambil data. Coba muat ulang halaman."
                    }
                    action={
                        <Button asChild>
                            <Link href="/events">Lihat event lainnya</Link>
                        </Button>
                    }
                />
            </div>
        );
    }

    const date = parseEventDate(event.eventDate, { lang: "id" });
    const thumbnail = getThumbnail(event);
    const availability = getAvailability(event);
    const soldPercent =
        availability.capacity > 0
            ? Math.min(100, Math.round(((event.tickets_sold ?? 0) / availability.capacity) * 100))
            : 0;
    const gallery = (event.images || []).map((img) => getImageUrl(img)).filter((src) => src !== thumbnail);
    const isMultiDay = !date.compare.isSameDay;

    const BuyButton = (
        <Button
            size="lg"
            className="w-full h-12 text-base cursor-pointer"
            disabled={isLoadingTicket || !availability.canBuy}
            onClick={buy}
        >
            {isLoadingTicket ? (
                <LoadingComponent type="icon" />
            ) : (
                <>
                    <Ticket className="size-5" />
                    {availability.canBuy ? "Beli Tiket Sekarang" : availability.label}
                </>
            )}
        </Button>
    );

    return (
        <article className="w-full">
            <div className="relative w-full h-[320px] md:h-[440px] overflow-hidden bg-black">
                <img
                    src={thumbnail}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/20" />
                <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex items-end pb-8">
                    <div className="hidden md:block w-56 lg:w-64 aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
                        <img src={thumbnail} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-3 md:pl-8 min-w-0">
                        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-foreground">Beranda</Link>
                            <ChevronRight className="size-3" />
                            <Link href="/events" className="hover:text-foreground">Event</Link>
                            <ChevronRight className="size-3" />
                            <span className="text-foreground truncate max-w-[200px]">{event.title}</span>
                        </nav>
                        <div className="flex flex-wrap items-center gap-2">
                            <AvailabilityBadge event={event} />
                            {event.categories?.map((c) => (
                                <Link
                                    key={c}
                                    href={`/events?category=${encodeURIComponent(c)}`}
                                    className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/80 hover:bg-white/10"
                                >
                                    {c}
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                            {event.title}
                        </h1>
                        {event.excerpt && (
                            <p className="text-white/75 max-w-2xl text-sm md:text-base">{event.excerpt}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 py-10 grid gap-10 lg:grid-cols-[1fr_360px]">
                <div className="flex flex-col gap-10 min-w-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard icon={CalendarDays} label="Tanggal">
                            {isMultiDay
                                ? `${date.start.day}, ${date.start.dateMonth} – ${date.end.day}, ${date.end.dateMonth} ${date.end.year}`
                                : `${date.start.day}, ${date.start.dateMonth} ${date.start.year}`}
                        </InfoCard>
                        <InfoCard icon={Clock3} label="Waktu">
                            {date.time.start} – {date.time.end} WIB
                            <span className="block text-xs text-muted-foreground font-normal">
                                Durasi {date.time.duration.formatted}
                            </span>
                        </InfoCard>
                        <InfoCard icon={MapPin} label="Lokasi">
                            {event.location || "-"}
                            {event.location && (
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block text-xs text-primary font-normal hover:underline"
                                >
                                    Buka di Google Maps
                                </a>
                            )}
                        </InfoCard>
                        <InfoCard icon={Building2} label="Penyelenggara">
                            {event.vendor || "-"}
                        </InfoCard>
                    </div>

                    <section className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold tracking-tight">Tentang Event</h2>
                        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                            {event.description || "Belum ada deskripsi untuk event ini."}
                        </div>
                    </section>

                    {!!event.sponsor?.length && (
                        <section className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold tracking-tight">Didukung oleh</h2>
                            <div className="flex flex-wrap gap-2">
                                {event.sponsor.map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {gallery.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold tracking-tight">Galeri</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {gallery.map((src) => (
                                    <img
                                        key={src}
                                        src={src}
                                        alt=""
                                        loading="lazy"
                                        className="w-full aspect-video object-cover rounded-xl border border-border"
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
                    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5 shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Harga tiket</span>
                                <p className="text-3xl font-bold tabular-nums">
                                    {event.price > 0 ? ConverterCurrency({ amount: event.price }) : "Gratis"}
                                </p>
                                <span className="text-xs text-muted-foreground">belum termasuk PPN 11%</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleSaveFavorite}
                                    disabled={isLoadingSaved}
                                    aria-label={isSaved ? "Hapus dari favorit" : "Simpan ke favorit"}
                                    aria-pressed={isSaved}
                                    className="cursor-pointer"
                                >
                                    {isLoadingSaved ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <Star className={cn("size-4", isSaved && "fill-amber-400 text-amber-400")} />
                                    )}
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleShare} aria-label="Bagikan" className="cursor-pointer">
                                    <Share2 className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                    <Users className="size-4" />
                                    {availability.isSoldOut
                                        ? "Tiket habis"
                                        : `${availability.remaining.toLocaleString("id-ID")} tiket tersisa`}
                                </span>
                                <span className="text-xs text-muted-foreground tabular-nums">{soldPercent}% terjual</span>
                            </div>
                            <Progress value={soldPercent} className="h-2" />
                        </div>

                        {BuyButton}

                        {!availability.canBuy && !availability.isSoldOut && !availability.isPast && (
                            <p className="text-xs text-center text-muted-foreground">
                                Penjualan tiket untuk event ini belum dibuka.
                            </p>
                        )}
                        {availability.isSoldOut && (
                            <p className="text-xs text-center text-muted-foreground">
                                Simpan ke favorit untuk memantau jika ada tiket tambahan.
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-border bg-card/60 p-5 text-xs text-muted-foreground flex flex-col gap-2">
                        <p>E-ticket dengan QR code dikirim ke akunmu setelah pembayaran berhasil.</p>
                        <p>Tiket yang sudah dibeli tidak dapat dikembalikan kecuali event dibatalkan.</p>
                    </div>
                </aside>
            </div>

            {!!event.related?.length && (
                <section className="w-full max-w-7xl mx-auto px-4 pb-16 flex flex-col gap-8">
                    <SectionHeader
                        eyebrow="Rekomendasi"
                        title="Event lain yang mungkin kamu suka"
                        href="/events"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {event.related.map((item) => (
                            <EventsItem2 key={item._id} data={item} />
                        ))}
                    </div>
                </section>
            )}

            <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur p-3 flex items-center gap-3">
                <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-muted-foreground">Harga tiket</span>
                    <span className="font-bold tabular-nums truncate">
                        {event.price > 0 ? ConverterCurrency({ amount: event.price }) : "Gratis"}
                    </span>
                </div>
                <div className="flex-1">{BuyButton}</div>
            </div>
            <div className="h-20 lg:hidden" />
        </article>
    );
}

function InfoCard({
    icon: Icon,
    label,
    children,
}: {
    icon: React.ElementType;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-4 rounded-2xl border border-border bg-card/60 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
                <span className="font-semibold text-foreground break-words">{children}</span>
            </div>
        </div>
    );
}
