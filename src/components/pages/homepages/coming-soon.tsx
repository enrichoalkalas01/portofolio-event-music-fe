"use client";

import Link from "next/link";
import EventsItem2 from "./events-item-2";
import { Button } from "@/components/shadcn/ui/button";

export default function ComingSoonHomepages() {
    return (
        <section className="w-full md:max-w-5xl lg:max-w-7xl mx-auto py-18 flex flex-col gap-8">
            <div className="w-full text-center">
                <h2 className="text-5xl uppercase font-bold">
                    Coming Soon Events
                </h2>
            </div>
            <div className="w-full h-full min-h-[500px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
                    <EventsItem2 />
                    <EventsItem2 />
                    <EventsItem2 />
                    <EventsItem2 />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <Link href="/events/coming-soon">
                    <Button className="cursor-pointer">See More</Button>
                </Link>
            </div>
        </section>
    );
}
