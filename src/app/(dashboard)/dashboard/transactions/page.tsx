"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Calendar, Ticket, CreditCard } from "lucide-react";
import { Badge } from "@/components/shadcn/ui/badge";
import { ConverterCurrency } from "@/utils/currency";
import Link from "next/link";

export default function Page() {
    const session: any = useSession();
    const accessToken = session?.data?.user?.token?.access_token;

    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard-user-transactions"],
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "failed":
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "checkout":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "success":
                return "Berhasil";
            case "pending":
                return "Menunggu";
            case "failed":
                return "Gagal";
            case "cancelled":
                return "Dibatalkan";
            case "checkout":
                return "Checkout";
            default:
                return status;
        }
    };

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus={true}
                headerTitle="Riwayat Transaksi"
                headerSubTitle="Daftar semua transaksi Anda"
                className="p-0 gap-0"
            >
                <div className="w-full">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">
                            Memuat data...
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">
                            Gagal memuat data
                        </div>
                    ) : data?.data?.length > 0 ? (
                        <div className="divide-y">
                            {data?.data?.map((transaction: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/dashboard/events/${transaction?._id}`}
                                >
                                    <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-100 rounded-lg">
                                                <Ticket className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">
                                                    {transaction?.event?.title || "Event"}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(
                                                            transaction?.createdAt
                                                        ).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <CreditCard className="w-4 h-4" />
                                                        {transaction?._id?.slice(0, 8)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-bold text-purple-600">
                                                    {ConverterCurrency({
                                                        amount:
                                                            transaction?.request?.total_payment || 0,
                                                    })}
                                                </p>
                                            </div>
                                            <Badge
                                                className={getStatusColor(
                                                    transaction?.status_transaction
                                                )}
                                            >
                                                {getStatusLabel(transaction?.status_transaction)}
                                            </Badge>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <CreditCard className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                Belum Ada Transaksi
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Anda belum melakukan transaksi apapun.
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
