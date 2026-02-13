"use client";

import { Clock4, Ticket } from "lucide-react";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import EventsItem from "@/components/pages/homepages/events-item";
import { Input } from "@/components/shadcn/ui/input";
import { useQuery } from "@tanstack/react-query";
import PaginationSimple from "@/components/generals/pagination/pagination-simple";

export default function Page() {
    const [size, setSize] = useState(10);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState("");

    const { data, error, isLoading } = useQuery({
        queryKey: ["events", search],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/events?search=${search}&size=${size}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    const handleSearchEnter = (e: any) => {
        if (e?.key === "Enter") setSearch(query);
    };

    const handleSearch = () => {
        setSearch(query);
    };

    console.log(data, error, isLoading);

    return (
        <section className="w-full min-h-[80vh] lg:max-w-7xl mx-auto py-8 px-4 ">
            <div className="w-full flex flex-col gap-4">
                <div className="w-full search-bar flex gap-4">
                    <Input
                        onChange={(e: any) => setQuery(e?.target?.value)}
                        onKeyDown={handleSearchEnter}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

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

                <div>
                    <PaginationSimple />
                </div>
            </div>
        </section>
    );
}
