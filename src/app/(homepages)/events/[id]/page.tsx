"use client";

import { LoadingComponent } from "@/components/generals/loading/loading";
import { Button } from "@/components/shadcn/ui/button";
import { parseEventDate } from "@/lib/parsed-date";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    Calendar,
    Loader2,
    MapPin,
    Share2,
    Star,
    Ticket,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BaseUrlImage =
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function Page() {
    const router = useRouter();
    const session: any = useSession();
    const accessToken: any = session?.data?.user?.token?.access_token;
    const params = useParams();
    const queryClient = useQueryClient();

    const [ParsedDate, setParsedDate] = useState<any>({});
    const [Thumbnail, setThumbnail] = useState<any>("");
    const [isLoadingTicket, setIsLoadingTicket] = useState(false);
    const [isLoadingSaved, setIsLoadingSaved] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ["event-detail", params?.id],
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
        enabled: !!params?.id,
    });

    // Check if event is saved
    const { data: savedStatus } = useQuery({
        queryKey: ["saved-check", params?.id],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/saved/check/${params?.id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                )
            ).json(),
        enabled: !!accessToken && !!params?.id,
    });

    useEffect(() => {
        if (savedStatus?.data?.isSaved !== undefined) {
            setIsSaved(savedStatus.data.isSaved);
        }
    }, [savedStatus]);

    useEffect(() => {
        if (data?.data) {
            const parsedDate = parseEventDate(data?.data?.eventDate, {
                lang: "en",
            });

            const thumbnail = !data?.data?.thumbnail?.[0]
                ? "/no-image-available.jpg"
                : BaseUrlImage + data?.data?.thumbnail?.[0]?.name;

            setParsedDate(parsedDate);
            setThumbnail(thumbnail);
        }
    }, [data]);

    const handleShare = async () => {
        const shareData = {
            title: data?.data?.title || "Event",
            text: `Check out this event: ${data?.data?.title}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    toast.error("Failed to share", {
                        position: "top-right",
                    });
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!", {
                    position: "top-right",
                });
            } catch {
                toast.error("Failed to copy link", {
                    position: "top-right",
                });
            }
        }
    };

    const handleSaveFavorite = async () => {
        setIsLoadingSaved(true);
        try {
            if (!accessToken) {
                throw {
                    message: "You must login first to save favorite.",
                };
            }

            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/saved/${params?.id}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios(config);
            const newIsSaved = response?.data?.data?.isSaved;
            setIsSaved(newIsSaved);

            toast.success(
                newIsSaved
                    ? "Event saved to favorites"
                    : "Event removed from favorites",
                {
                    position: "top-right",
                },
            );

            queryClient.invalidateQueries({
                queryKey: ["saved-check", params?.id],
            });
            queryClient.invalidateQueries({
                queryKey: ["dashboard-saved-events"],
            });
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || error?.message,
                {
                    position: "top-right",
                },
            );
        } finally {
            setIsLoadingSaved(false);
        }
    };

    const handleBuyTicket = async () => {
        setIsLoadingTicket(true);
        try {
            if (!accessToken) {
                throw {
                    message: "You must login first for buy tickets.",
                };
            }

            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/transactions/${params?.id}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios(config);
            toast.success("Successfull to order ticket", {
                position: "top-right",
            });
            router.push(`/checkout/${response?.data?.data?._id}`);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || error?.message,
                {
                    position: "top-right",
                },
            );
        } finally {
            setIsLoadingTicket(false);
        }
    };

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
                                    {isLoadingSaved ? (
                                        <Loader2 className="w-7 h-7 animate-spin" />
                                    ) : (
                                        <Star
                                            className={`w-7 h-7 cursor-pointer transition-colors ${
                                                isSaved
                                                    ? "text-yellow-500 fill-yellow-500"
                                                    : "hover:text-gray-600"
                                            }`}
                                            onClick={handleSaveFavorite}
                                        />
                                    )}
                                </div>
                                <Share2
                                    className="w-7 h-7 cursor-pointer hover:text-gray-600"
                                    onClick={handleShare}
                                />
                            </div>
                            <div className="w-auto">
                                <Button
                                    disabled={isLoadingTicket}
                                    className="cursor-pointer"
                                    onClick={handleBuyTicket}
                                >
                                    {isLoadingTicket ? (
                                        <LoadingComponent type="icon" />
                                    ) : (
                                        <span>Buy Ticket</span>
                                    )}
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
