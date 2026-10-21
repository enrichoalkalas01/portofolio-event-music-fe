"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

import { columns } from "./table-columns";
import { DataTable } from "./table-data";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { api, getErrorMessage } from "@/lib/api";
import { useAccessToken } from "@/hooks/use-access-token";

export default function TablePageSystemParamsType() {
    const { accessToken } = useAccessToken();

    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-system-params-type-list"],
        queryFn: () => api<any[]>("/system-params-type", { token: accessToken, query: { size: 200 } }),
        enabled: !!accessToken,
    });

    if (isLoading || !accessToken) {
        return (
            <div className="flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-11 w-full" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 rounded-md border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
                <AlertCircle className="size-4" /> {getErrorMessage(error)}
            </div>
        );
    }

    return (
        <div className="w-full">
            <DataTable columns={columns} data={data?.data || []} />
        </div>
    );
}
