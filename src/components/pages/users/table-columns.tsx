"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/shadcn/ui/badge";
import TableRowAction from "./table-row-action";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "username",
        header: () => <div className="">Username</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("username")}</div>;
        },
    },
    {
        accessorKey: "fullname",
        header: () => <div className="">Nama Lengkap</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("fullname") || "-"}</div>;
        },
    },
    {
        accessorKey: "email",
        header: () => <div className="">Email</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("email")}</div>;
        },
    },
    {
        accessorKey: "phonenumber",
        header: () => <div className="">No. Telepon</div>,
        cell: ({ row }) => {
            return <div className="">{row.getValue("phonenumber") || "-"}</div>;
        },
    },
    {
        accessorKey: "role",
        header: () => <div className="">Role</div>,
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            const colorMap: Record<string, string> = {
                super_admin: "bg-red-100 text-red-800",
                admin: "bg-purple-100 text-purple-800",
                member: "bg-blue-100 text-blue-800",
                user: "bg-green-100 text-green-800",
                guest: "bg-gray-100 text-gray-800",
            };
            return (
                <Badge className={colorMap[role] || "bg-gray-100 text-gray-800"}>
                    {role || "-"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "isActive",
        header: () => <div className="">Status</div>,
        cell: ({ row }) => {
            const isActive = row.getValue("isActive");
            return (
                <Badge className={isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {isActive ? "Aktif" : "Tidak Aktif"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="">Actions</div>,
        cell: ({ row, table }) => {
            return (
                <div className="">
                    <TableRowAction table={table} row={row} />
                </div>
            );
        },
    },
];
