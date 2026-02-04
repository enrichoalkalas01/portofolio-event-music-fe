"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./table-columns";
import { DataTable } from "./table-data";

export default function TablePageSystemParamsType() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-events-list"],
        queryFn: async () =>
            (
                await fetch(`${process.env.NEXT_PUBLIC_URL_API}/events`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).json(),
    });

    console.log(data, error, isLoading);

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data?.data || []} />
        </div>
    );
}
