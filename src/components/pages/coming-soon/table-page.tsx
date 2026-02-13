"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./table-columns";
import { DataTable } from "./table-data";

export default function TablePageComingSoon() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["admin-coming-soon-list"],
        queryFn: async () =>
            (
                await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/events/coming-soon`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json(),
    });

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data?.data || []} />
        </div>
    );
}
