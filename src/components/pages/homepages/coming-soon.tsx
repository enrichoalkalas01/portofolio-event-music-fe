"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";

import EventsItem2 from "./events-item-2";
import SectionHeader from "@/components/generals/section-header";
import EmptyState from "@/components/generals/empty-state";
import { EventGridSkeleton } from "@/components/pages/events/event-skeletons";
import { api } from "@/lib/api";
import type { EventRecord } from "@/lib/event-status";

export default function ComingSoonHomepages() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["home-events-coming-soon"],
        queryFn: () => api<EventRecord[]>("/events/coming-soon", { query: { size: 4, upcoming: true } }),
        staleTime: 60 * 1000,
    });

    const events = data?.data ?? [];
    if (!isLoading && !error && events.length === 0) return null;

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col gap-8">
            <SectionHeader
                eyebrow="Jangan sampai terlewat"
                title="Segera Hadir"
                description="Event besar yang akan segera dibuka penjualannya. Simpan ke favorit agar tidak ketinggalan."
                href="/events/coming-soon"
            />

            {isLoading && <EventGridSkeleton count={4} />}

            {error && (
                <EmptyState
                    icon={Sparkles}
                    title="Gagal memuat event"
                    description="Terjadi gangguan saat mengambil data."
                />
            )}

            {!isLoading && !error && events.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventsItem2 key={event._id} data={event} />
                    ))}
                </div>
            )}
        </section>
    );
}
