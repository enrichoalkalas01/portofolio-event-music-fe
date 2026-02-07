"use client";

import { Clock4, Eye, Ticket } from "lucide-react";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";

import { parseEventDate } from "@/lib/parsed-date";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingComponent } from "@/components/generals/loading/loading";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

const BaseUrlImage =
    process.env.NEXT_PUBLIC_URL_IMAGE ||
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function EventsItem({ data }: { data: any }) {
    const router = useRouter();
    const session: any = useSession();
    const accessToken: any = session?.data?.user?.token?.access_token;

    const dateParsed = parseEventDate(data?.eventDate, { lang: "en" });
    const thumbnail = !data?.thumbnail?.[0]
        ? "/no-image-available.jpg"
        : BaseUrlImage + data?.thumbnail?.[0]?.name;

    const [isLoadingTicket, setIsLoadingTicket] = useState(false);
    const [isLoadingMoreInfo, setIsLoadingMoreInfo] = useState(false);

    const handleBuyTicket = async () => {
        setIsLoadingTicket(true);
        try {
            if (!accessToken) {
                throw {
                    message: "You must login first for buy tickets.",
                };
            }

            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/transactions/${data?._id}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios(config);
            router.push(`/checkout/${response?.data?.data?._id}`);
        } catch (error: any) {
            toast.error(error?.response?.message || error?.message, {
                position: "top-right",
            });
        } finally {
            setIsLoadingTicket(false);
        }
    };

    const handleMoreDetail = () => {
        router.push(`/events/${data?._id || data?.id}`);
    };

    return (
        <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center gap-6 p-5 rounded-xl shadow-2xl border border-gray-700/50">
            {/* Date Section */}
            <div className="flex flex-col justify-center items-center min-w-[80px] text-center">
                <p className="text-pink-500 font-medium text-sm">
                    {dateParsed?.start?.dayShort},
                </p>
                <p className="text-pink-500 font-bold text-2xl leading-tight">
                    {dateParsed?.start?.dateMonth}
                </p>
                <p className="text-pink-500 font-bold text-2xl leading-tight">
                    {dateParsed?.start?.year}
                </p>
            </div>

            {/* Image Section - ukuran fixed tapi lebih besar dari sebelumnya */}
            <div className="flex-shrink-0">
                <div className="w-[140px] h-[140px] rounded-lg overflow-hidden ring-1 ring-purple-500/40">
                    <img
                        src={thumbnail}
                        alt="TY TRACK - REMASTERED"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
                <h1 className="text-xl font-bold text-white hover:text-primary">
                    <Link href={`/events/${data?._id}`}>{data?.title}</Link>
                </h1>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-cyan-400 font-medium">
                        {data?.location}
                    </span>
                    {dateParsed?.time?.start !== dateParsed?.time?.end && (
                        <>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-400">
                                {dateParsed?.time?.range}
                            </span>
                        </>
                    )}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {data?.excerpt}
                </p>

                <div>
                    <span className="inline-flex items-center gap-1.5 text-cyan-400 text-xs border border-cyan-500/40 rounded-full px-3 py-1">
                        <Clock4 className="w-3.5 h-3.5" />
                        {data?.total_tickets || data?.max_participants} Tickets
                        Remaining
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 justify-center">
                <Button
                    disabled={isLoadingTicket}
                    onClick={handleBuyTicket}
                    className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md px-6 py-2.5 flex items-center gap-2 whitespace-nowrap"
                >
                    {isLoadingTicket ? (
                        <LoadingComponent type="icon" />
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Ticket className="w-4 h-4" />
                            Buy Tickets
                        </div>
                    )}
                </Button>
                <Button
                    disabled={isLoadingMoreInfo}
                    onClick={handleMoreDetail}
                    variant="outline"
                    className="cursor-pointer border-gray-600 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-md px-6 py-2.5 whitespace-nowrap"
                >
                    {isLoadingMoreInfo ? (
                        <LoadingComponent type="icon" />
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Eye className="w-4 h-4" />
                            More Info
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
}
