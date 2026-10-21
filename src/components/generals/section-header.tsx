import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    description?: string;
    href?: string;
    hrefLabel?: string;
    align?: "left" | "center";
    className?: string;
}

export default function SectionHeader({
    eyebrow,
    title,
    description,
    href,
    hrefLabel = "Lihat semua",
    align = "left",
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
                align === "center" && "md:flex-col md:items-center text-center",
                className,
            )}
        >
            <div className={cn("flex flex-col gap-2", align === "center" && "items-center")}>
                {eyebrow && (
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {eyebrow}
                    </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
                        {description}
                    </p>
                )}
            </div>
            {href && (
                <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
                >
                    {hrefLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
    );
}
