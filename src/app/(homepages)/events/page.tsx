"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { CalendarX2, Search, SlidersHorizontal, X } from "lucide-react";

import EventsItem from "@/components/pages/homepages/events-item";
import EmptyState from "@/components/generals/empty-state";
import PaginationSimple from "@/components/generals/pagination/pagination-simple";
import { EventListSkeleton } from "@/components/pages/events/event-skeletons";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/ui/select";
import { api } from "@/lib/api";
import type { EventRecord } from "@/lib/event-status";
import { useDebounceT } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

const SORT_OPTIONS = [
    { value: "date-asc", label: "Tanggal terdekat", order: "eventDate.start", sort: "asc" },
    { value: "date-desc", label: "Tanggal terjauh", order: "eventDate.start", sort: "desc" },
    { value: "price-asc", label: "Harga terendah", order: "price", sort: "asc" },
    { value: "price-desc", label: "Harga tertinggi", order: "price", sort: "desc" },
    { value: "newest", label: "Baru ditambahkan", order: "createdAt", sort: "desc" },
];

const TIME_FILTERS = [
    { value: "upcoming", label: "Akan datang" },
    { value: "all", label: "Semua" },
    { value: "past", label: "Sudah lewat" },
];

export default function Page() {
    return (
        <Suspense fallback={<EventListSkeleton count={4} />}>
            <EventsPage />
        </Suspense>
    );
}

function EventsPage() {
    const router = useRouter();
    const searchParams = useSearchParams() ?? new URLSearchParams();

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const category = searchParams.get("category") || "";
    const time = searchParams.get("time") || "upcoming";
    const sortKey = searchParams.get("sort") || "date-asc";
    const search = searchParams.get("q") || "";

    const [query, setQuery] = useState(search);
    const debouncedQuery = useDebounceT(query, 400);

    const setParams = (patch: Record<string, string | number | null | undefined>, resetPage = true) => {
        const next = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(patch)) {
            if (value === null || value === undefined || value === "") next.delete(key);
            else next.set(key, String(value));
        }
        if (resetPage) next.delete("page");
        router.replace(`/events${next.toString() ? `?${next}` : ""}`, { scroll: false });
    };

    useEffect(() => {
        if (debouncedQuery !== search) setParams({ q: debouncedQuery });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery]);

    const sortOption = SORT_OPTIONS.find((s) => s.value === sortKey) || SORT_OPTIONS[0];

    const queryParams = useMemo(
        () => ({
            search: search || undefined,
            category: category || undefined,
            upcoming: time === "upcoming" ? true : time === "past" ? false : undefined,
            status: time === "upcoming" ? undefined : "all",
            order: sortOption.order,
            sort: sortOption.sort,
            size: PAGE_SIZE,
            page,
        }),
        [search, category, time, sortOption, page],
    );

    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ["events-list", queryParams],
        queryFn: () => api<EventRecord[]>("/events", { query: queryParams }),
        placeholderData: keepPreviousData,
    });

    const { data: categories } = useQuery({
        queryKey: ["events-categories"],
        queryFn: () => api<{ name: string; total: number }[]>("/events/categories"),
        staleTime: 5 * 60 * 1000,
    });

    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const events = data?.data ?? [];
    const hasFilter = !!search || !!category || time !== "upcoming" || sortKey !== "date-asc";

    const handleChangePage = (newPage: number) => {
        setParams({ page: newPage }, false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetFilters = () => {
        setQuery("");
        router.replace("/events", { scroll: false });
    };

    return (
        <section className="w-full">
            <div className="w-full border-b border-border bg-gradient-to-b from-primary/10 to-transparent">
                <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Jelajahi
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Semua Event</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Cari konser, festival, dan pertunjukan musik di seluruh Indonesia.
                        Filter berdasarkan kategori, waktu, atau harga.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 min-h-[60vh]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama event, lokasi, atau promotor..."
                            className="pl-9 h-11"
                            aria-label="Cari event"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                aria-label="Hapus pencarian"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Select value={category || "all"} onValueChange={(v) => setParams({ category: v === "all" ? null : v })}>
                            <SelectTrigger className="h-11 w-full sm:w-[180px]" aria-label="Kategori">
                                <SelectValue placeholder="Semua kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua kategori</SelectItem>
                                {categories?.data?.map((c) => (
                                    <SelectItem key={c.name} value={c.name}>
                                        {c.name} ({c.total})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortKey} onValueChange={(v) => setParams({ sort: v === "date-asc" ? null : v })}>
                            <SelectTrigger className="h-11 w-full sm:w-[190px]" aria-label="Urutkan">
                                <SlidersHorizontal className="size-4 text-muted-foreground" />
                                <SelectValue placeholder="Urutkan" />
                            </SelectTrigger>
                            <SelectContent>
                                {SORT_OPTIONS.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2" role="tablist" aria-label="Filter waktu">
                        {TIME_FILTERS.map((t) => (
                            <button
                                key={t.value}
                                role="tab"
                                aria-selected={time === t.value}
                                onClick={() => setParams({ time: t.value === "upcoming" ? null : t.value })}
                                className={cn(
                                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                                    time === t.value
                                        ? "border-primary bg-primary/15 text-primary"
                                        : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
                                )}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {!isLoading && !error && (
                            <span className={cn(isFetching && "opacity-60")}>
                                {total} event
                                {search && (
                                    <>
                                        {" "}untuk &ldquo;<span className="text-foreground">{search}</span>&rdquo;
                                    </>
                                )}
                                {category && (
                                    <>
                                        {" "}di <span className="text-foreground">{category}</span>
                                    </>
                                )}
                            </span>
                        )}
                        {hasFilter && (
                            <Button variant="ghost" size="sm" onClick={resetFilters} className="cursor-pointer">
                                <X className="size-3.5" /> Reset
                            </Button>
                        )}
                    </div>
                </div>

                {isLoading && <EventListSkeleton count={4} />}

                {error && (
                    <EmptyState
                        icon={CalendarX2}
                        title="Gagal memuat event"
                        description="Terjadi gangguan saat mengambil data. Coba muat ulang halaman."
                        action={
                            <Button variant="outline" onClick={() => router.refresh()}>
                                Muat ulang
                            </Button>
                        }
                    />
                )}

                {!isLoading && !error && events.length === 0 && (
                    <EmptyState
                        icon={Search}
                        title="Tidak ada event yang cocok"
                        description={
                            hasFilter
                                ? "Coba ubah kata kunci atau hapus filter untuk melihat lebih banyak event."
                                : "Belum ada event yang tersedia saat ini."
                        }
                        action={
                            hasFilter ? (
                                <Button variant="outline" onClick={resetFilters}>
                                    Hapus semua filter
                                </Button>
                            ) : undefined
                        }
                    />
                )}

                {!isLoading && !error && events.length > 0 && (
                    <div className={cn("w-full flex flex-col gap-5 transition-opacity", isFetching && "opacity-70")}>
                        {events.map((event) => (
                            <EventsItem data={event} key={event._id} />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center pt-2">
                        <PaginationSimple
                            currentPage={page}
                            totalPages={totalPages}
                            onChangePage={handleChangePage}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
