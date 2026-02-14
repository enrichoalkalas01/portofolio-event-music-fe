"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
    Calendar,
    MapPin,
    Heart,
    Trash2,
    ExternalLink,
    Bookmark,
} from "lucide-react";
import Link from "next/link";
import { parseEventDate } from "@/lib/parsed-date";
import { ConverterCurrency } from "@/utils/currency";
import { toast } from "sonner";
import axios from "axios";

const BaseUrlImage =
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function Page() {
    const session: any = useSession();
    const accessToken = session?.data?.user?.token?.access_token;
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard-saved-events"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/users/saved-events`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
            ).json(),
        enabled: !!accessToken,
    });

    const removeMutation = useMutation({
        mutationFn: async (eventId: string) => {
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/users/saved-events/${eventId}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            };
            return axios(config);
        },
        onSuccess: () => {
            toast.success("Event berhasil dihapus dari daftar simpan", {
                position: "top-right",
            });
            queryClient.invalidateQueries({ queryKey: ["dashboard-saved-events"] });
            queryClient.invalidateQueries({ queryKey: ["saved-check"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Gagal menghapus event",
                { position: "top-right" }
            );
        },
    });

    const handleRemove = (eventId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        removeMutation.mutate(eventId);
    };

    const savedEvents = data?.data || [];

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "active":
            case "published":
                return "bg-green-100 text-green-800";
            case "coming soon":
                return "bg-blue-100 text-blue-800";
            case "sold out":
                return "bg-red-100 text-red-800";
            case "ended":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-purple-100 text-purple-800";
        }
    };

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Event Tersimpan"
                headerSubTitle="Daftar event yang Anda simpan untuk nanti"
                className="p-0 gap-0"
                buttonUrlComponent={
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Bookmark className="w-4 h-4" />
                        <span>{savedEvents.length} Event</span>
                    </div>
                }
            >
                <div className="w-full p-4">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">
                            Memuat data...
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">
                            Gagal memuat data
                        </div>
                    ) : savedEvents.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {savedEvents.map((item: any, index: number) => {
                                const event = item?.event || item;
                                const parsedDate = event?.eventDate
                                    ? parseEventDate(event?.eventDate, { lang: "id" })
                                    : null;
                                const thumbnail = event?.thumbnail?.[0]?.name
                                    ? BaseUrlImage + event?.thumbnail?.[0]?.name
                                    : "/no-image-available.jpg";

                                return (
                                    <Card
                                        key={index}
                                        className="overflow-hidden hover:shadow-lg transition-shadow group"
                                    >
                                        <Link href={`/events/${event?._id || event?.id}`}>
                                            <div className="relative">
                                                <div
                                                    className="h-44 bg-gray-200 bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url('${thumbnail}')`,
                                                    }}
                                                />
                                                {/* Overlay with actions */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            className="cursor-pointer"
                                                        >
                                                            <ExternalLink className="w-4 h-4 mr-1" />
                                                            Lihat
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="cursor-pointer"
                                                            onClick={(e) =>
                                                                handleRemove(
                                                                    event?._id || event?.id,
                                                                    e
                                                                )
                                                            }
                                                            disabled={removeMutation.isPending}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                {/* Status Badge */}
                                                <Badge
                                                    className={`absolute top-3 right-3 ${getStatusColor(
                                                        event?.status
                                                    )}`}
                                                >
                                                    {event?.status || "Active"}
                                                </Badge>
                                                {/* Saved indicator */}
                                                <div className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md">
                                                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg line-clamp-1 mb-2">
                                                    {event?.title || "Event"}
                                                </h3>
                                                <div className="space-y-2 text-sm text-gray-600 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-purple-600" />
                                                        <span>
                                                            {parsedDate?.start?.full || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-purple-600" />
                                                        <span className="line-clamp-1">
                                                            {event?.location || "-"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pt-3 border-t">
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            Mulai dari
                                                        </p>
                                                        <p className="font-bold text-purple-600">
                                                            {ConverterCurrency({
                                                                amount: event?.price || 0,
                                                            })}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="cursor-pointer bg-purple-600 hover:bg-purple-700"
                                                    >
                                                        Beli Tiket
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bookmark className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                Belum Ada Event Tersimpan
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Simpan event yang menarik agar Anda bisa dengan mudah menemukannya
                                lagi nanti. Klik ikon hati pada event untuk menyimpannya.
                            </p>
                            <Link href="/events">
                                <Button className="cursor-pointer bg-purple-600 hover:bg-purple-700">
                                    Jelajahi Event
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </WrapperCard>

            {/* Tips Section */}
            {savedEvents.length > 0 && (
                <Card className="mt-6 p-4 bg-purple-50 border-purple-100">
                    <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-purple-800">Tips</h4>
                            <p className="text-sm text-purple-600">
                                Event yang sudah tersimpan akan tetap ada di sini sampai Anda
                                menghapusnya. Jangan lupa untuk segera membeli tiket sebelum
                                kehabisan!
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </section>
    );
}
