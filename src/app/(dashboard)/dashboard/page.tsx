"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Calendar, Ticket, CreditCard, Clock } from "lucide-react";
import { ConverterCurrency } from "@/utils/currency";
import Link from "next/link";
import { Badge } from "@/components/shadcn/ui/badge";

export default function Page() {
    const session: any = useSession();
    const user = session?.data?.user;
    const accessToken = user?.token?.access_token;

    const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery({
        queryKey: ["dashboard-transactions"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/transactions?size=5`,
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

    const stats = [
        {
            title: "Total Tiket",
            value: transactionsData?.data?.length || 0,
            icon: Ticket,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Transaksi Sukses",
            value: transactionsData?.data?.filter((t: any) => t.status_transaction === "success")?.length || 0,
            icon: CreditCard,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Transaksi Pending",
            value: transactionsData?.data?.filter((t: any) => t.status_transaction === "pending")?.length || 0,
            icon: Clock,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
        },
        {
            title: "Event Diikuti",
            value: transactionsData?.data?.filter((t: any) => t.status_transaction === "success")?.length || 0,
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
    ];

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
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
            {/* Welcome Section */}
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-800">
                    Selamat Datang, {user?.name || "User"}!
                </h1>
                <p className="text-gray-600">
                    Kelola tiket dan transaksi Anda di sini.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Transactions */}
            <WrapperCard
                headerStatus={true}
                headerTitle="Transaksi Terbaru"
                headerSubTitle="5 transaksi terakhir Anda"
                className="p-0 gap-0"
            >
                <div className="w-full">
                    {isLoadingTransactions ? (
                        <div className="p-8 text-center text-gray-500">
                            Memuat data...
                        </div>
                    ) : transactionsData?.data?.length > 0 ? (
                        <div className="divide-y">
                            {transactionsData?.data?.slice(0, 5).map((transaction: any, index: number) => (
                                <div
                                    key={index}
                                    className="p-4 flex items-center justify-between hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Ticket className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {transaction?.event?.title || "Event"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                ID: {transaction?._id?.slice(0, 8)}...
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-medium">
                                                {ConverterCurrency({
                                                    amount: transaction?.request?.total_payment || 0,
                                                })}
                                            </p>
                                        </div>
                                        <Badge className={getStatusColor(transaction?.status_transaction)}>
                                            {transaction?.status_transaction}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            Belum ada transaksi
                        </div>
                    )}
                </div>
            </WrapperCard>

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/dashboard/transactions">
                    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center gap-4">
                            <CreditCard className="w-8 h-8 text-purple-600" />
                            <div>
                                <p className="font-medium">Lihat Semua Transaksi</p>
                                <p className="text-sm text-gray-500">
                                    Kelola riwayat transaksi Anda
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link href="/events">
                    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Calendar className="w-8 h-8 text-purple-600" />
                            <div>
                                <p className="font-medium">Jelajahi Event</p>
                                <p className="text-sm text-gray-500">
                                    Temukan event musik terbaru
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link href="/dashboard/events">
                    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Ticket className="w-8 h-8 text-purple-600" />
                            <div>
                                <p className="font-medium">Tiket Saya</p>
                                <p className="text-sm text-gray-500">
                                    Lihat tiket yang sudah dibeli
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
