"use client";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Calendar, Users, CreditCard, TrendingUp, Ticket, FileText } from "lucide-react";
import { ConverterCurrency } from "@/utils/currency";
import Link from "next/link";
import { Badge } from "@/components/shadcn/ui/badge";

export default function Page() {
    const session: any = useSession();
    const user = session?.data?.user;
    const accessToken = user?.token?.access_token;

    const { data: eventsData } = useQuery({
        queryKey: ["admin-dashboard-events"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/events?size=100`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).json(),
    });

    const { data: usersData } = useQuery({
        queryKey: ["admin-dashboard-users"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users?size=100`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            ).json(),
        enabled: !!accessToken,
    });

    const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery({
        queryKey: ["admin-dashboard-transactions"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions?size=100`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            ).json(),
        enabled: !!accessToken,
    });

    const totalRevenue = transactionsData?.data
        ?.filter((t: any) => t.status_transaction === "success")
        ?.reduce((acc: number, t: any) => acc + (t?.request?.total_payment || 0), 0) || 0;

    const stats = [
        {
            title: "Total Event",
            value: eventsData?.data?.length || 0,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            href: "/admin/events",
        },
        {
            title: "Total User",
            value: usersData?.data?.length || 0,
            icon: Users,
            color: "text-green-600",
            bgColor: "bg-green-100",
            href: "/admin/users",
        },
        {
            title: "Total Transaksi",
            value: transactionsData?.data?.length || 0,
            icon: CreditCard,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            href: "/admin/transactions",
        },
        {
            title: "Total Pendapatan",
            value: ConverterCurrency({ amount: totalRevenue }),
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            href: "/admin/transactions",
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
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Selamat datang, {user?.name || "Admin"}! Kelola platform Event Music dari sini.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Link key={index} href={stat.href}>
                        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
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
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Transactions */}
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Transaksi Terbaru"
                    headerSubTitle=""
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
                                    <Link
                                        key={index}
                                        href={`/admin/transactions/${transaction?._id}`}
                                    >
                                        <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <Ticket className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">
                                                        {transaction?.event?.title || "Event"}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {transaction?.user?.firstname} {transaction?.user?.lastname}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className={getStatusColor(transaction?.status_transaction)}>
                                                {transaction?.status_transaction}
                                            </Badge>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                Belum ada transaksi
                            </div>
                        )}
                    </div>
                </WrapperCard>

                {/* Quick Actions */}
                <WrapperCard
                    headerStatus={true}
                    headerTitle="Aksi Cepat"
                    headerSubTitle=""
                    className="p-0 gap-0"
                >
                    <div className="p-4 grid gap-3">
                        <Link href="/admin/events/create">
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                                <div className="flex items-center gap-4">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="font-medium">Buat Event Baru</p>
                                        <p className="text-sm text-gray-500">
                                            Tambahkan event musik baru
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/admin/events">
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                                <div className="flex items-center gap-4">
                                    <FileText className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="font-medium">Kelola Event</p>
                                        <p className="text-sm text-gray-500">
                                            Lihat dan edit event yang ada
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/admin/users">
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500">
                                <div className="flex items-center gap-4">
                                    <Users className="w-6 h-6 text-purple-600" />
                                    <div>
                                        <p className="font-medium">Kelola User</p>
                                        <p className="text-sm text-gray-500">
                                            Lihat daftar pengguna
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/admin/transactions">
                            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="w-6 h-6 text-orange-600" />
                                    <div>
                                        <p className="font-medium">Kelola Transaksi</p>
                                        <p className="text-sm text-gray-500">
                                            Lihat semua transaksi
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </WrapperCard>
            </div>
        </div>
    );
}
