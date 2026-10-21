"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Sparkles, Ticket } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const SLIDES = [
    { src: "/music-event-banner-1.jpg", alt: "Penonton konser di depan panggung" },
    { src: "/bg-event-music.jpg", alt: "Panggung festival musik malam hari" },
    { src: "/music-event-banner-2.jpg", alt: "DJ tampil di festival musik" },
];

const HIGHLIGHTS = [
    { icon: Ticket, label: "E-ticket instan" },
    { icon: ShieldCheck, label: "Pembayaran aman" },
    { icon: CalendarDays, label: "Jadwal selalu update" },
    { icon: MapPin, label: "Event di seluruh Indonesia" },
];

export default function HeroHomepages() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 7000);
        return () => clearInterval(id);
    }, []);

    const { data: stats } = useQuery({
        queryKey: ["hero-stats"],
        queryFn: async () => {
            const [upcoming, categories] = await Promise.all([
                api<unknown[]>("/events", { query: { upcoming: true, size: 1 } }),
                api<unknown[]>("/events/categories"),
            ]);
            return { upcoming: upcoming.total || 0, categories: categories.total || 0 };
        },
        staleTime: 5 * 60 * 1000,
    });

    return (
        <section className="relative w-full min-h-[calc(100svh-4rem)] lg:min-h-[680px] overflow-hidden bg-black">
            {SLIDES.map((slide, i) => (
                <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out",
                        i === active ? "opacity-100 scale-100" : "opacity-0 scale-105",
                    )}
                    loading={i === 0 ? "eager" : "lazy"}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />

            <div className="relative w-full max-w-7xl mx-auto px-4 min-h-[calc(100svh-4rem)] lg:min-h-[680px] flex flex-col justify-center py-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-2xl flex flex-col gap-6"
                >
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        <Sparkles className="size-3.5" />
                        Platform tiket musik Indonesia
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                        Rasakan musik{" "}
                        <span className="bg-gradient-to-r from-primary via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
                            secara langsung.
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed">
                        Konser, festival, dan sesi intim dari musisi favoritmu. Pilih event,
                        bayar dengan aman, dan tiketmu langsung tersimpan di akun.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="lg" asChild className="h-12 px-6 text-base">
                            <Link href="/events">
                                Jelajahi Event <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="h-12 px-6 text-base border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        >
                            <Link href="/events/coming-soon">Segera Hadir</Link>
                        </Button>
                    </div>
                    <div className="flex items-center gap-8 pt-2">
                        <Stat value={stats?.upcoming} label="Event mendatang" />
                        <Stat value={stats?.categories} label="Kategori musik" />
                        <Stat value="100%" label="Tiket resmi" />
                    </div>
                </motion.div>

                <div className="absolute bottom-6 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <ul className="hidden md:flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
                        {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                            <li key={label} className="inline-flex items-center gap-1.5">
                                <Icon className="size-3.5 text-primary" /> {label}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2" role="tablist" aria-label="Slide hero">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === active}
                                aria-label={`Slide ${i + 1}`}
                                onClick={() => setActive(i)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all cursor-pointer",
                                    i === active ? "w-8 bg-primary" : "w-3 bg-white/40 hover:bg-white/70",
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Stat({ value, label }: { value?: number | string; label: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {value ?? "—"}
            </span>
            <span className="text-xs text-white/60">{label}</span>
        </div>
    );
}
