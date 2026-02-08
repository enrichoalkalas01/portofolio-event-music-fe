"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Calendar, MapPin, Ticket, Clock } from "lucide-react";
import { Badge } from "@/components/shadcn/ui/badge";
import Link from "next/link";
import { parseEventDate } from "@/lib/parsed-date";

const BaseUrlImage =
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function Page() {
    const session: any = useSession();
    const accessToken = session?.data?.user?.token?.access_token;

    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard-user-events"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/transactions?size=50`,
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

    const successTransactions = data?.data?.filter(
        (t: any) => t.status_transaction === "success"
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "failed":
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Tiket Saya"
                headerSubTitle="Daftar tiket event yang sudah Anda beli"
                className="p-0 gap-0"
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
                    ) : successTransactions?.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {successTransactions?.map((transaction: any, index: number) => {
                                const event = transaction?.event;
                                const parsedDate = event?.eventDate
                                    ? parseEventDate(event?.eventDate, { lang: "id" })
                                    : null;
                                const thumbnail = event?.thumbnail?.[0]?.name
                                    ? BaseUrlImage + event?.thumbnail?.[0]?.name
                                    : "/no-image-available.jpg";

                                return (
                                    <Link
                                        key={index}
                                        href={`/dashboard/events/${transaction?._id}`}
                                    >
                                        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                            <div
                                                className="h-40 bg-gray-200 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url('${thumbnail}')`,
                                                }}
                                            />
                                            <div className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-bold text-lg line-clamp-1">
                                                        {event?.title || "Event"}
                                                    </h3>
                                                    <Badge className={getStatusColor(transaction?.status_transaction)}>
                                                        {transaction?.status_transaction}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>
                                                            {parsedDate?.start?.full || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="line-clamp-1">
                                                            {event?.location || "-"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Ticket className="w-4 h-4" />
                                                        <span>
                                                            ID: {transaction?._id?.slice(0, 8)}...
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <Ticket className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                Belum Ada Tiket
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Anda belum memiliki tiket event. Mulai jelajahi event musik
                                yang tersedia!
                            </p>
                            <Link
                                href="/events"
                                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Jelajahi Event
                            </Link>
                        </div>
                    )}
                </div>
            </WrapperCard>
        </section>
    );
}
