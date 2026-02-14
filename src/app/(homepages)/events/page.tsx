"use client";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import EventsItem from "@/components/pages/homepages/events-item";
import { Input } from "@/components/shadcn/ui/input";
import { useQuery } from "@tanstack/react-query";
import PaginationSimple from "@/components/generals/pagination/pagination-simple";

export default function Page() {
    const [size] = useState(10);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");

    const { data, error, isLoading } = useQuery({
        queryKey: ["events", search, page, size],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/events?search=${search}&size=${size}&page=${page}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    const total = data?.total || 0;
    const totalPages = Math.ceil(total / size);

    const handleSearchEnter = (e: any) => {
        if (e?.key === "Enter") {
            setSearch(query);
            setPage(1);
        }
    };

    const handleSearch = () => {
        setSearch(query);
        setPage(1);
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="w-full min-h-[80vh] lg:max-w-7xl mx-auto py-8 px-4 ">
            <div className="w-full flex flex-col gap-4">
                <div className="w-full search-bar flex gap-4">
                    <Input
                        onChange={(e: any) => setQuery(e?.target?.value)}
                        onKeyDown={handleSearchEnter}
                        placeholder="Cari event..."
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                {/* Result info */}
                {!isLoading && data?.data && (
                    <div className="text-sm text-gray-500">
                        Menampilkan {data?.data?.length || 0} dari {total} event
                        {search && (
                            <span>
                                {" "}untuk &quot;{search}&quot;
                            </span>
                        )}
                    </div>
                )}

                {!isLoading && data?.data && data?.data?.length > 0 && (
                    <div className="w-full flex flex-col gap-6">
                        {data?.data?.map((e: any, index: number) => {
                            return <EventsItem data={e} key={index} />;
                        })}
                    </div>
                )}

                {!isLoading && data?.data && data?.data?.length === 0 && (
                    <div className="min-h-[500px] flex items-center justify-center w-full flex flex-col gap-6">
                        <span>No Data Found</span>
                    </div>
                )}

                {isLoading && (
                    <div className="min-h-[500px] flex items-center justify-center w-auto h-auto">
                        <span>Loading...</span>
                    </div>
                )}

                {error && (
                    <div className="min-h-[500px] flex items-center justify-center w-auto h-auto">
                        <span>Failed to retrieve data events...</span>
                    </div>
                )}

                {totalPages > 1 && (
                    <div>
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
