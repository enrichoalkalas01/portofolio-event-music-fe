"use client";

import { Button } from "@/components/shadcn/ui/button";
import { parseEventDate } from "@/lib/parsed-date";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Share2, Star, Ticket } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BaseUrlImage =
    process.env.NEXT_PUBLIC_URL_IMAGE ||
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function Page() {
    const params = useParams();

    const [ParsedDate, setParsedDate] = useState<any>({});
    const [Thumbnail, setThumbnail] = useState<any>("");

    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-events-list"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/events/${params?.id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    console.log(data?.data);

    useEffect(() => {
        if (data?.data) {
            const parsedDate = parseEventDate(data?.data?.eventDate, {
                lang: "en",
            });

            const thumbnail = !data?.data?.thumbnail?.[0]
                ? "/no-image-available.jpg"
                : BaseUrlImage + data?.data?.thumbnail?.[0]?.name;

            console.log(thumbnail);

            setParsedDate(parsedDate);
            setThumbnail(thumbnail);
        }
    }, [data]);

    return (
        <section className="w-full min-h-[80vh]">
            <div
                className="w-full h-[500px] bg-purple-800"
                style={{
                    backgroundImage: `url('${Thumbnail}')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="w-full lg:max-w-7xl py-8 px-4 mx-auto">
                <div className="w-full py-8">
                    <div className="w-full justify-between flex gap-4">
                        <div className="w-full">
                            <h1 className="text-3xl font-bold uppercase">
                                {data?.data?.title || "-"}
                            </h1>
                        </div>
                        <div className="w-auto flex items-center gap-4">
                            <div className="flex gap-4">
                                <div className="flex">
                                    <Star className="w-7 h-7 cursor-pointer hover:text-gray-600" />
                                    {/* <StarOff className="w-7 h-7 cursor-pointer hover:text-gray-600" /> */}
                                </div>
                                <Share2 className="w-7 h-7 cursor-pointer hover:text-gray-600" />
                            </div>
                            <div className="w-auto">
                                <Button className="cursor-pointer">
                                    Buy Ticket
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-8 border-y py-8">
                    <div className="w-full flex flex-col gap-4">
                        <h3 className="text-xl font-bold uppercase">
                            Ticket Information
                        </h3>
                        <div className="w-full md:max-w-1/2 text-wrap flex items-start gap-4">
                            <Calendar className="w-8 h-8" />
                            <span>
                                {ParsedDate?.start?.day},{" "}
                                {ParsedDate?.start?.full}
                            </span>
                        </div>
                        <div className="w-full md:max-w-1/2 text-wrap flex items-start gap-4">
                            <MapPin className="w-8 h-8" />
                            <span>{data?.data?.location}</span>
                        </div>
                    </div>

                    <div className="w-full">
                        <h3 className="text-xl font-bold uppercase">
                            Hosted By
                        </h3>
                    </div>
                </div>

                <div className="w-full border-y py-8">
                    <h3 className="text-xl font-bold uppercase">Description</h3>
                    <p className="mt-4">{data?.data?.description}</p>
                </div>

                <div className="w-full border-y py-8">
                    <h3 className="text-xl font-bold uppercase">
                        Other Events you may like
                    </h3>
                    {/* Container Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
                        {/* Single Card */}

                        {/* Duplicate cards untuk contoh grid... */}
                    </div>
                </div>
            </div>
        </section>
    );
}
