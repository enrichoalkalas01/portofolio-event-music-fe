"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import EventsItem2 from "@/components/pages/homepages/events-item-2";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/events/coming-soon?size=1`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    return (
        <section className="w-full md:max-w-5xl lg:max-w-7xl mx-auto py-18 flex flex-col gap-12">
            <div className="w-full text-center">
                <h2 className="text-5xl uppercase font-bold">
                    Coming Soon Events
                </h2>
            </div>
            <div className="w-full h-full min-h-[500px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
                    {data?.data &&
                        data?.data?.length > 0 &&
                        data?.data?.map((e: any, index: number) => {
                            return <EventsItem2 key={index} data={e} />;
                        })}
                </div>
            </div>
        </section>
    );
}
