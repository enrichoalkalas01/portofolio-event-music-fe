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
                super_admin: "bg-rose-500/15 text-rose-400 border-rose-500/30",
                admin: "bg-primary/15 text-primary",
                member: "bg-sky-500/15 text-sky-400 border-sky-500/30",
                user: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                guest: "bg-muted text-foreground",
            };
            return (
                <Badge className={colorMap[role] || "bg-muted text-foreground"}>
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
                <Badge className={isActive ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"}>
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
