"use client";

import Link from "next/link";
import EventsItem from "./events-item";
import { Button } from "@/components/shadcn/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function EventsHomepages() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/events?limit=5`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    return (
        <section className="w-full md:max-w-5xl lg:max-w-7xl mx-auto py-18 flex flex-col gap-8">
            <div className="w-full text-center">
                <h2 className="text-5xl uppercase font-bold">Events</h2>
            </div>
            <div className="w-full h-full min-h-[500px]">
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
            </div>
            <div className="w-full flex items-center justify-center">
                <Link href="/events/coming-soon">
                    <Button className="cursor-pointer">See More</Button>
                </Link>
            </div>
        </section>
    );
}
