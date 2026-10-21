"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";

import EventsItem2 from "@/components/pages/homepages/events-item-2";
import EmptyState from "@/components/generals/empty-state";
import { EventGridSkeleton } from "@/components/pages/events/event-skeletons";
import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/lib/api";
import type { EventRecord } from "@/lib/event-status";

export default function Page() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["events-coming-soon-page"],
        queryFn: () => api<EventRecord[]>("/events/coming-soon", { query: { size: 48, upcoming: true } }),
    });

    const events = data?.data ?? [];

    return (
        <section className="w-full">
            <div className="w-full border-b border-border bg-gradient-to-b from-sky-500/10 to-transparent">
                <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Jangan sampai terlewat
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Segera Hadir</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Event besar yang sudah diumumkan dan akan segera dibuka penjualannya.
                        Simpan ke favorit agar kamu dapat kabar lebih dulu.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 py-10 min-h-[50vh] flex flex-col gap-8">
                {isLoading && <EventGridSkeleton count={8} />}

                {error && (
                    <EmptyState
                        icon={Sparkles}
                        title="Gagal memuat event"
                        description="Terjadi gangguan saat mengambil data. Coba muat ulang halaman."
                    />
                )}

                {!isLoading && !error && events.length === 0 && (
                    <EmptyState
                        icon={Sparkles}
                        title="Belum ada pengumuman event"
                        description="Semua event yang sudah dibuka bisa kamu lihat di halaman event."
                        action={
                            <Button asChild>
                                <Link href="/events">Lihat semua event</Link>
                            </Button>
                        }
                    />
                )}

                {!isLoading && !error && events.length > 0 && (
                    <>
                        <p className="text-sm text-muted-foreground">{events.length} event segera hadir</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {events.map((event) => (
                                <EventsItem2 key={event._id} data={event} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
