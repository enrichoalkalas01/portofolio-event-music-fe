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

import { IMAGE_BASE_URL } from "@/lib/config";

const BaseUrlImage = `${IMAGE_BASE_URL}/`;

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
                return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
            case "coming soon":
                return "bg-sky-500/15 text-sky-400 border-sky-500/30";
            case "sold out":
                return "bg-rose-500/15 text-rose-400 border-rose-500/30";
            case "ended":
                return "bg-muted text-foreground";
            default:
                return "bg-primary/15 text-primary";
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Bookmark className="w-4 h-4" />
                        <span>{savedEvents.length} Event</span>
                    </div>
                }
            >
                <div className="w-full p-4">
                    {isLoading ? (
                        <div className="p-8 text-center text-muted-foreground">
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
                                                    className="h-44 bg-muted bg-cover bg-center"
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
                                                <div className="space-y-2 text-sm text-muted-foreground mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-primary" />
                                                        <span>
                                                            {parsedDate?.start?.full || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        <span className="line-clamp-1">
                                                            {event?.location || "-"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pt-3 border-t">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Mulai dari
                                                        </p>
                                                        <p className="font-bold text-primary">
                                                            {ConverterCurrency({
                                                                amount: event?.price || 0,
                                                            })}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="cursor-pointer bg-primary hover:bg-primary"
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
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bookmark className="w-10 h-10 text-muted-foreground/60" />
                            </div>
                            <h3 className="text-lg font-medium text-muted-foreground mb-2">
                                Belum Ada Event Tersimpan
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Simpan event yang menarik agar Anda bisa dengan mudah menemukannya
                                lagi nanti. Klik ikon hati pada event untuk menyimpannya.
                            </p>
                            <Link href="/events">
                                <Button className="cursor-pointer bg-primary hover:bg-primary">
                                    Jelajahi Event
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </WrapperCard>

            {/* Tips Section */}
            {savedEvents.length > 0 && (
                <Card className="mt-6 p-4 bg-primary/15 border-purple-100">
                    <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                            <h4 className="font-medium text-primary">Tips</h4>
                            <p className="text-sm text-primary">
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
