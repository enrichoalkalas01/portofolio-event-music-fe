"use client";

import { columns, Payment } from "./table-columns";
import { DataTable } from "./table-data";

export default function TablePageSystemParamsType() {
    const data: Payment[] = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
    ];

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
