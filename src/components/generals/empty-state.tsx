import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export default function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center text-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16",
                className,
            )}
        >
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-7" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground max-w-md">{description}</p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
