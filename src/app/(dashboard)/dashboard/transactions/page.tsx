"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Calendar, CreditCard, Hash, Ticket, XCircle } from "lucide-react";

import { WrapperCard } from "@/components/generals/wrapper/wrapper-card";
import EmptyState from "@/components/generals/empty-state";
import ConfirmDialog from "@/components/generals/confirm-dialog";
import PaginationSimple from "@/components/generals/pagination/pagination-simple";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { api, getErrorMessage } from "@/lib/api";
import { ConverterCurrency } from "@/utils/currency";
import { TRANSACTION_STATUS_LABEL, transactionStatusClass, type TransactionStatus } from "@/lib/event-status";
import { useAccessToken } from "@/hooks/use-access-token";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;
const FILTERS: { value: string; label: string }[] = [
    { value: "all", label: "Semua" },
    { value: "pending", label: "Menunggu" },
    { value: "success", label: "Berhasil" },
    { value: "checkout", label: "Checkout" },
    { value: "cancelled", label: "Dibatalkan" },
    { value: "failed", label: "Gagal" },
];

export default function Page() {
    return (
        <Suspense fallback={null}>
            <TransactionsPage />
        </Suspense>
    );
}

function TransactionsPage() {
    const { accessToken } = useAccessToken();
    const router = useRouter();
    const searchParams = useSearchParams() ?? new URLSearchParams();
    const queryClient = useQueryClient();

    const status = searchParams.get("status") || "all";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const [cancelTarget, setCancelTarget] = useState<any>(null);

    const setParams = (patch: Record<string, string | number | null>) => {
        const next = new URLSearchParams(searchParams.toString());
        for (const [k, v] of Object.entries(patch)) {
            if (v === null || v === "" || v === "all") next.delete(k);
            else next.set(k, String(v));
        }
        router.replace(`/dashboard/transactions${next.toString() ? `?${next}` : ""}`, { scroll: false });
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["dashboard-user-transactions", status, page],
        queryFn: () => api<any[]>("/transactions", { token: accessToken, query: { status, page, size: PAGE_SIZE } }),
        enabled: !!accessToken,
    });

    const handleCancel = async () => {
        if (!cancelTarget) return;
        try {
            await api(`/transactions/${cancelTarget._id}/cancel`, { method: "POST", token: accessToken });
            toast.success("Transaksi dibatalkan");
            queryClient.invalidateQueries({ queryKey: ["dashboard-user-transactions"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-transactions"] });
        } catch (err) {
            toast.error(getErrorMessage(err, "Gagal membatalkan transaksi"));
        }
    };

    const transactions = data?.data ?? [];
    const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

    return (
        <section className="w-full">
            <WrapperCard
                headerStatus
                headerTitle="Riwayat Transaksi"
                headerSubTitle="Semua pembelian tiketmu"
                className="p-0 gap-0"
                classNameContent="p-0"
            >
                <div className="px-4 pt-4 flex flex-wrap gap-2">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setParams({ status: f.value, page: null })}
                            className={cn(
                                "rounded-full border px-3.5 py-1 text-sm transition-colors cursor-pointer",
                                status === f.value
                                    ? "border-primary bg-primary/15 text-primary"
                                    : "border-border text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="p-4">
                    {isLoading ? (
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-20 w-full" />
                            ))}
                        </div>
                    ) : error ? (
                        <EmptyState title="Gagal memuat transaksi" description={getErrorMessage(error)} />
                    ) : transactions.length === 0 ? (
                        <EmptyState
                            icon={CreditCard}
                            title="Belum ada transaksi"
                            description={status === "all" ? "Kamu belum melakukan transaksi apa pun." : "Tidak ada transaksi dengan status ini."}
                            action={
                                <Button asChild>
                                    <Link href="/events">Jelajahi Event</Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="flex flex-col gap-3">
                            {transactions.map((tx: any) => {
                                const canCancel = ["checkout", "pending"].includes(tx.status_transaction);
                                const canContinue = tx.status_transaction === "checkout";
                                return (
                                    <div
                                        key={tx._id}
                                        className="rounded-xl border border-border bg-card/60 p-4 flex flex-col md:flex-row md:items-center gap-4"
                                    >
                                        <Link href={`/dashboard/transactions/${tx._id}`} className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                                <Ticket className="size-5" />
                                            </div>
                                            <div className="min-w-0 flex flex-col gap-1">
                                                <h3 className="font-medium truncate hover:text-primary">{tx?.event?.title || "Event"}</h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar className="size-3.5" />
                                                        {new Date(tx.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 font-mono">
                                                        <Hash className="size-3.5" />
                                                        {tx._id?.slice(-8).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                                            <span className="font-bold tabular-nums">
                                                {tx?.request?.total_payment ? ConverterCurrency({ amount: tx.request.total_payment }) : "-"}
                                            </span>
                                            <Badge className={transactionStatusClass(tx.status_transaction)}>
                                                {TRANSACTION_STATUS_LABEL[tx.status_transaction as TransactionStatus] || tx.status_transaction}
                                            </Badge>
                                            {canContinue && (
                                                <Button size="sm" asChild>
                                                    <Link href={`/checkout/${tx._id}`}>Lanjutkan</Link>
                                                </Button>
                                            )}
                                            {canCancel && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-rose-400 hover:text-rose-400 cursor-pointer"
                                                    onClick={() => setCancelTarget(tx)}
                                                    aria-label="Batalkan transaksi"
                                                >
                                                    <XCircle className="size-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center pt-6">
                            <PaginationSimple currentPage={page} totalPages={totalPages} onChangePage={(p) => setParams({ page: p })} />
                        </div>
                    )}
                </div>
            </WrapperCard>

            <ConfirmDialog
                open={!!cancelTarget}
                onOpenChange={(open) => !open && setCancelTarget(null)}
                title="Batalkan transaksi ini?"
                description="Transaksi yang dibatalkan tidak bisa dilanjutkan. Kamu bisa membeli tiket lagi dari halaman event."
                confirmLabel="Ya, batalkan"
                destructive
                onConfirm={handleCancel}
            />
        </section>
    );
}
