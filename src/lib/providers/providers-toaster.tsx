"use client";

import { Toaster } from "@/components/shadcn/ui/sonner";

import { TriangleAlert, CircleX, Info, CheckCheck } from "lucide-react";

export default function ProvidersToaster({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Toaster
                position="top-right"
                closeButton
                icons={{
                    success: <CheckCheck className="w-5 h-5 text-emerald-400" />,
                    info: <Info className="w-5 h-5 text-sky-400" />,
                    warning: (
                        <TriangleAlert className="w-5 h-5 text-amber-400" />
                    ),
                    error: <CircleX className="w-5 h-5 text-rose-400" />,
                }}
            />
        </>
    );
}
