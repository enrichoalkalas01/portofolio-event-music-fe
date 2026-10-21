"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
    ArrowRight,
    Calendar,
    CalendarPlus,
    CreditCard,
    FileText,
    Ticket,
    TrendingUp,
    Users,
} from "lucide-react";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import { Card } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { api } from "@/lib/api";
import { ConverterCurrency } from "@/utils/currency";
import { TRANSACTION_STATUS_LABEL, transactionStatusClass, type TransactionStatus } from "@/lib/event-status";
import { useAccessToken } from "@/hooks/use-access-token";

interface Summary {
    transactions: Record<string, number>;
    revenue: number;
    tickets_sold: number;
    events: Record<string, number>;
    users: number;
}

export default function Page() {
    const { accessToken, user } = useAccessToken();

    const { data: summary, isLoading: isLoadingSummary } = useQuery({
        queryKey: ["admin-summary"],
        queryFn: () => api<Summary>("/transactions/admin/summary", { token: accessToken }),
        enabled: !!accessToken,
    });

    const { data: recent, isLoading: isLoadingRecent } = useQuery({
        queryKey: ["admin-recent-transactions"],
        queryFn: () => api<any[]>("/transactions/admin", { token: accessToken, query: { size: 6 } }),
        enabled: !!accessToken,
    });

    const s = summary?.data;
    const totalEvents = Object.values(s?.events || {}).reduce((a, b) => a + b, 0);
    const totalTx = Object.values(s?.transactions || {}).reduce((a, b) => a + b, 0);

    const stats = [
        {
            title: "Pendapatan",
            value: ConverterCurrency({ amount: s?.revenue || 0 }),
            hint: `${(s?.tickets_sold || 0).toLocaleString("id-ID")} tiket terjual`,
            icon: TrendingUp,
            href: "/admin/transactions",
        },
        {
            title: "Transaksi",
            value: totalTx.toLocaleString("id-ID"),
            hint: `${s?.transactions?.pending || 0} menunggu pembayaran`,
            icon: CreditCard,
            href: "/admin/transactions",
        },
        {
            title: "Event",
            value: totalEvents.toLocaleString("id-ID"),
            hint: `${s?.events?.ACTIVE || 0} aktif · ${s?.events?.DRAFT || 0} draft`,
            icon: Calendar,
            href: "/admin/events",
        },
        {
            title: "Pengguna",
            value: (s?.users || 0).toLocaleString("id-ID"),
            hint: "akun terdaftar",
            icon: Users,
            href: "/admin/users",
        },
    ];

    const quickActions = [
        { href: "/admin/events/create", icon: CalendarPlus, title: "Buat Event Baru", desc: "Tambahkan event musik baru" },
        { href: "/admin/events", icon: FileText, title: "Kelola Event", desc: "Lihat dan edit event yang ada" },
        { href: "/admin/users", icon: Users, title: "Kelola Pengguna", desc: "Lihat daftar pengguna" },
        { href: "/admin/transactions", icon: CreditCard, title: "Kelola Transaksi", desc: "Pantau semua transaksi" },
    ];

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Ringkasan</h1>
                <p className="text-muted-foreground">
                    Selamat datang, {user?.name || "Admin"}. Berikut kondisi platform saat ini.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.href}>
                        <Card className="p-5 hover:border-primary/40 transition-colors h-full">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-sm text-muted-foreground">{stat.title}</span>
                                    {isLoadingSummary ? (
                                        <Skeleton className="h-8 w-28" />
                                    ) : (
                                        <span className="text-2xl font-bold tabular-nums truncate">{stat.value}</span>
                                    )}
                                    <span className="text-xs text-muted-foreground">{stat.hint}</span>
                                </div>
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                    <stat.icon className="size-5" />
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <WrapperCard
                    headerStatus
                    headerTitle="Transaksi Terbaru"
                    headerSubTitle="6 transaksi terakhir di platform"
                    className="p-0 gap-0"
                    classNameContent="p-0"
                >
                    {isLoadingRecent ? (
                        <div className="p-4 flex flex-col gap-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-14 w-full" />
                            ))}
                        </div>
                    ) : (recent?.data?.length ?? 0) > 0 ? (
                        <div className="divide-y divide-border">
                            {recent!.data.map((tx: any) => (
                                <Link
                                    key={tx._id}
                                    href={`/admin/transactions/${tx._id}`}
                                    className="p-4 flex items-center justify-between gap-4 hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                            <Ticket className="size-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm truncate">{tx?.event?.title || "Event"}</p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {tx?.user?.username} · {tx?.request?.total_payment ? ConverterCurrency({ amount: tx.request.total_payment }) : "-"}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge className={transactionStatusClass(tx?.status_transaction)}>
                                        {TRANSACTION_STATUS_LABEL[tx?.status_transaction as TransactionStatus] || tx?.status_transaction}
                                    </Badge>
                                </Link>
                            ))}
                            <Link
                                href="/admin/transactions"
                                className="p-3 flex items-center justify-center gap-1.5 text-sm text-primary hover:underline"
                            >
                                Lihat semua transaksi <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">Belum ada transaksi</div>
                    )}
                </WrapperCard>

                <WrapperCard headerStatus headerTitle="Aksi Cepat" headerSubTitle="Tugas yang sering dilakukan" className="p-0 gap-0">
                    <div className="grid gap-3">
                        {quickActions.map((action) => (
                            <Link key={action.href} href={action.href}>
                                <Card className="p-4 hover:border-primary/40 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                            <action.icon className="size-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium">{action.title}</p>
                                            <p className="text-sm text-muted-foreground">{action.desc}</p>
                                        </div>
                                        <ArrowRight className="size-4 ml-auto text-muted-foreground" />
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </WrapperCard>
            </div>
        </div>
    );
}
