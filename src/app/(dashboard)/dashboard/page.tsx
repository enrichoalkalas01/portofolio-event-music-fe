"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { ArrowRight, Bookmark, Calendar, Clock, CreditCard, Ticket } from "lucide-react";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Button } from "@/components/shadcn/ui/button";
import { api } from "@/lib/api";
import { ConverterCurrency } from "@/utils/currency";
import { TRANSACTION_STATUS_LABEL, transactionStatusClass, type TransactionStatus } from "@/lib/event-status";
import { useAccessToken } from "@/hooks/use-access-token";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <DashboardHome />
        </Suspense>
    );
}

function DashboardHome() {
    const { accessToken, user } = useAccessToken();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams?.get("denied") === "admin") {
            toast.error("Kamu tidak memiliki akses ke panel admin.");
        }
    }, [searchParams]);

    const { data, isLoading } = useQuery({
        queryKey: ["dashboard-transactions"],
        queryFn: () => api<any[]>("/transactions", { token: accessToken, query: { size: 100 } }),
        enabled: !!accessToken,
    });

    const { data: saved } = useQuery({
        queryKey: ["dashboard-saved-events"],
        queryFn: () => api<any[]>("/users/saved-events", { token: accessToken }),
        enabled: !!accessToken,
    });

    const transactions = data?.data ?? [];
    const success = transactions.filter((t) => t.status_transaction === "success");
    const pending = transactions.filter((t) => t.status_transaction === "pending");
    const upcomingTickets = success.filter((t) => t?.event?.eventDate?.end && new Date(t.event.eventDate.end) > new Date());

    const stats = [
        { title: "Tiket Aktif", value: upcomingTickets.length, icon: Ticket, href: "/dashboard/events" },
        { title: "Menunggu Pembayaran", value: pending.length, icon: Clock, href: "/dashboard/transactions" },
        { title: "Event Dihadiri", value: success.length - upcomingTickets.length, icon: Calendar, href: "/dashboard/events" },
        { title: "Event Tersimpan", value: saved?.total ?? saved?.data?.length ?? 0, icon: Bookmark, href: "/dashboard/events-saved" },
    ];

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Halo, {user?.name || user?.username || "Pengguna"}!
                </h1>
                <p className="text-muted-foreground">Kelola tiket dan transaksimu di sini.</p>
            </div>

            {pending.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                    <div className="flex items-center gap-3 text-sm">
                        <Clock className="size-5 text-amber-400 shrink-0" />
                        <span>
                            Kamu punya <strong>{pending.length}</strong> transaksi yang menunggu pembayaran.
                        </span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/transactions?status=pending">Selesaikan pembayaran</Link>
                    </Button>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.href}>
                        <Card className="p-5 hover:border-primary/40 transition-colors h-full">
                            <div className="flex items-center gap-4">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                    <stat.icon className="size-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">{stat.title}</span>
                                    {isLoading ? (
                                        <Skeleton className="h-7 w-12" />
                                    ) : (
                                        <span className="text-2xl font-bold tabular-nums">{stat.value}</span>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <WrapperCard
                headerStatus
                headerTitle="Transaksi Terbaru"
                headerSubTitle="5 transaksi terakhirmu"
                className="p-0 gap-0"
                classNameContent="p-0"
            >
                {isLoading ? (
                    <div className="p-4 flex flex-col gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                ) : transactions.length > 0 ? (
                    <div className="divide-y divide-border">
                        {transactions.slice(0, 5).map((tx: any) => (
                            <Link
                                key={tx._id}
                                href={`/dashboard/transactions/${tx._id}`}
                                className="p-4 flex items-center justify-between gap-4 hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                        <Ticket className="size-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm truncate">{tx?.event?.title || "Event"}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(tx.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="font-medium text-sm tabular-nums hidden sm:inline">
                                        {tx?.request?.total_payment ? ConverterCurrency({ amount: tx.request.total_payment }) : "-"}
                                    </span>
                                    <Badge className={transactionStatusClass(tx?.status_transaction)}>
                                        {TRANSACTION_STATUS_LABEL[tx?.status_transaction as TransactionStatus] || tx?.status_transaction}
                                    </Badge>
                                </div>
                            </Link>
                        ))}
                        <Link
                            href="/dashboard/transactions"
                            className="p-3 flex items-center justify-center gap-1.5 text-sm text-primary hover:underline"
                        >
                            Lihat semua transaksi <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="p-10 text-center flex flex-col items-center gap-3">
                        <CreditCard className="size-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground">Belum ada transaksi.</p>
                        <Button asChild>
                            <Link href="/events">Jelajahi Event</Link>
                        </Button>
                    </div>
                )}
            </WrapperCard>
        </div>
    );
}
