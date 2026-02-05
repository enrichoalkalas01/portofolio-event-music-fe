"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function TransactionCrumb({
    label,
    Icon,
    index,
    currentStep = 1,
    step,
}: {
    label: any;
    Icon: any;
    index: number;
    currentStep: number;
    step: any;
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        currentStep >= step
                            ? "bg-primary border-primary text-white"
                            : "border-border text-muted-foreground",
                    )}
                >
                    {currentStep > step ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Icon className="h-4 w-4" />
                    )}
                </div>
                <span
                    className={cn(
                        "text-sm font-medium hidden sm:block",
                        currentStep >= step
                            ? "text-foreground"
                            : "text-muted-foreground",
                    )}
                >
                    {label}
                </span>
            </div>
            {index < 2 && (
                <div
                    className={cn(
                        "w-8 h-0.5",
                        currentStep > step ? "bg-primary" : "bg-border",
                    )}
                />
            )}
        </div>
    );
}
