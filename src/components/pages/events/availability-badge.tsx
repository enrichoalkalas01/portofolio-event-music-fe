import { cn } from "@/lib/utils";
import { getAvailability, type EventRecord } from "@/lib/event-status";

const toneClass: Record<string, string> = {
    default: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    muted: "bg-muted text-muted-foreground border-border",
    info: "bg-sky-500/15 text-sky-300 border-sky-500/30",
};

export default function AvailabilityBadge({
    event,
    className,
}: {
    event: Partial<EventRecord>;
    className?: string;
}) {
    const availability = getAvailability(event);
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                toneClass[availability.tone],
                className,
            )}
        >
            {availability.label}
        </span>
    );
}
