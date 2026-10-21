export type EventStatus = "ACTIVE" | "DRAFT" | "CANCELLED" | "COMPLETED";
export type TransactionStatus =
    | "no_transaction"
    | "checkout"
    | "pending"
    | "success"
    | "failed"
    | "cancelled";

export interface EventRecord {
    _id: string;
    title: string;
    excerpt?: string;
    description?: string;
    eventDate: { start: string; end: string };
    location?: string;
    vendor?: string;
    sponsor?: string[];
    categories?: string[];
    thumbnail?: { name: string }[];
    images?: { name: string }[];
    status: EventStatus;
    max_participants: number;
    price: number;
    tickets_sold?: number;
    tickets_remaining?: number;
    is_sold_out?: boolean;
    is_past?: boolean;
    related?: EventRecord[];
    others?: { coming_soon?: "YES" | "NO" };
    createdAt?: string;
}

export const EVENT_STATUS_LABEL: Record<EventStatus, string> = {
    ACTIVE: "Aktif",
    DRAFT: "Draft",
    CANCELLED: "Dibatalkan",
    COMPLETED: "Selesai",
};

export const TRANSACTION_STATUS_LABEL: Record<TransactionStatus, string> = {
    no_transaction: "Belum Ada",
    checkout: "Checkout",
    pending: "Menunggu Pembayaran",
    success: "Berhasil",
    failed: "Gagal",
    cancelled: "Dibatalkan",
};

export function transactionStatusClass(status?: string): string {
    switch (status) {
        case "success":
            return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
        case "pending":
            return "bg-amber-500/15 text-amber-400 border-amber-500/30";
        case "checkout":
            return "bg-sky-500/15 text-sky-400 border-sky-500/30";
        case "failed":
        case "cancelled":
            return "bg-rose-500/15 text-rose-400 border-rose-500/30";
        default:
            return "bg-muted text-muted-foreground border-border";
    }
}

export function eventStatusClass(status?: string): string {
    switch (status) {
        case "ACTIVE":
            return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
        case "DRAFT":
            return "bg-muted text-muted-foreground border-border";
        case "CANCELLED":
            return "bg-rose-500/15 text-rose-400 border-rose-500/30";
        case "COMPLETED":
            return "bg-sky-500/15 text-sky-400 border-sky-500/30";
        default:
            return "bg-muted text-muted-foreground border-border";
    }
}

// Derived availability for a public event card / detail.
export function getAvailability(event: Partial<EventRecord> | null | undefined) {
    const now = Date.now();
    const start = event?.eventDate?.start ? new Date(event.eventDate.start).getTime() : null;
    const end = event?.eventDate?.end ? new Date(event.eventDate.end).getTime() : null;
    const isPast = event?.is_past ?? (!!end && end < now);
    const isOngoing = !!start && !!end && start <= now && now <= end;
    const isSoldOut = !!event?.is_sold_out;
    const isCancelled = event?.status === "CANCELLED";
    const isComingSoon = event?.others?.coming_soon === "YES";
    const remaining = event?.tickets_remaining ?? event?.max_participants ?? 0;
    const capacity = event?.max_participants ?? 0;
    const lowStock = !isSoldOut && capacity > 0 && remaining > 0 && remaining / capacity <= 0.15;

    const canBuy =
        event?.status === "ACTIVE" && !isPast && !isSoldOut && !isCancelled;

    let label = "Tersedia";
    let tone: "default" | "warning" | "danger" | "muted" | "info" = "default";
    if (isCancelled) {
        label = "Dibatalkan";
        tone = "danger";
    } else if (isPast || event?.status === "COMPLETED") {
        label = "Sudah Lewat";
        tone = "muted";
    } else if (isSoldOut) {
        label = "Sold Out";
        tone = "danger";
    } else if (isOngoing) {
        label = "Sedang Berlangsung";
        tone = "info";
    } else if (lowStock) {
        label = `Sisa ${remaining} tiket`;
        tone = "warning";
    } else if (isComingSoon) {
        label = "Segera Hadir";
        tone = "info";
    }

    return { isPast, isOngoing, isSoldOut, isCancelled, isComingSoon, lowStock, remaining, capacity, canBuy, label, tone };
}
