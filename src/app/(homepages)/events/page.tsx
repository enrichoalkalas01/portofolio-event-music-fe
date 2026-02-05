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
    const [events, setEvents] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const { data, error, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/events`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).json(),
    });

    return (
        <section className="w-full min-h-[80vh] lg:max-w-7xl mx-auto py-8 px-4 ">
            <div className="w-full flex flex-col gap-4">
                <div className="w-full search-bar flex gap-4">
                    <Input />
                    <Button>Search</Button>
                </div>

                {!isLoading && data?.data && (
                    <div className="w-full flex flex-col gap-6">
                        {data?.data?.map((e: any, index: number) => {
                            return <EventsItem data={e} key={index} />;
                        })}
                    </div>
                )}

                {isLoading && (
                    <div className="w-auto h-auto">
                        <span>Loading...</span>
                    </div>
                )}

                {error && (
                    <div className="w-auto h-auto">
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
