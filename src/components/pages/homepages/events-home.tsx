"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CalendarX2 } from "lucide-react";

import EventsItem from "./events-item";
import SectionHeader from "@/components/generals/section-header";
import EmptyState from "@/components/generals/empty-state";
import { EventListSkeleton } from "@/components/pages/events/event-skeletons";
import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/lib/api";
import type { EventRecord } from "@/lib/event-status";

export default function EventsHomepages() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["home-events-upcoming"],
        queryFn: () => api<EventRecord[]>("/events", { query: { upcoming: true, size: 5 } }),
        staleTime: 60 * 1000,
    });

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col gap-8">
            <SectionHeader
                eyebrow="Jadwal terdekat"
                title="Event Mendatang"
                description="Amankan tiketmu sebelum kehabisan. Diurutkan dari tanggal paling dekat."
                href="/events"
                hrefLabel="Lihat semua event"
            />

            {isLoading && <EventListSkeleton count={3} />}

            {error && (
                <EmptyState
                    icon={CalendarX2}
                    title="Gagal memuat event"
                    description="Terjadi gangguan saat mengambil data. Coba muat ulang halaman."
                />
            )}

            {!isLoading && !error && (data?.data?.length ?? 0) === 0 && (
                <EmptyState
                    icon={CalendarX2}
                    title="Belum ada event mendatang"
                    description="Pantau terus halaman ini, event baru akan segera diumumkan."
                    action={
                        <Button variant="outline" asChild>
                            <Link href="/events/coming-soon">Lihat yang segera hadir</Link>
                        </Button>
                    }
                />
            )}

            {!isLoading && !error && (data?.data?.length ?? 0) > 0 && (
                <div className="w-full flex flex-col gap-5">
                    {data!.data.map((event) => (
                        <EventsItem data={event} key={event._id} />
                    ))}
                </div>
            )}

            {(data?.total ?? 0) > 5 && (
                <div className="w-full flex items-center justify-center">
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/events">Lihat {data!.total} event lainnya</Link>
                    </Button>
                </div>
            )}
        </section>
    );
}
