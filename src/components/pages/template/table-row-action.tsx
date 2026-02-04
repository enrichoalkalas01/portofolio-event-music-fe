"use client";

import { Eye, MoreHorizontal, Pencil, Trash, Trash2 } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function TableRowAction({
    table,
    row,
}: {
    table: any;
    row: any;
}) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const id = row?.original?._id;
    const handleDelete = async () => {
        try {
            const config = {
                url: `${process.env.NEXT_PUBLIC_URL_API}/system-params-type/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer `,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios(config);
            queryClient.invalidateQueries({
                queryKey: ["admin-system-params-type-list"],
            });

            setTimeout(() => {
                toast.success(`Success to delete data ${id}`, {
                    position: "top-right",
                });
            }, 500);
        } catch (error: any) {
            toast.error(error?.message || error?.response?.message, {
                position: "top-right",
            });
        }
    };

    const handleEdit = () => {
        router.push(`/admin/system-params-type/${id}/update`);
    };

    const handleView = () => {
        router.push(`/admin/system-params-type/${id}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
                <DropdownMenuItem
                    onClick={handleView}
                    className="flex items-center justify-start gap-2 cursor-pointer"
                >
                    <Eye className="w-5 h-5" />
                    <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleEdit}
                    className="flex items-center justify-start gap-2 cursor-pointer"
                >
                    <Pencil className="w-5 h-5" />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="flex items-center justify-start gap-2 cursor-pointer text-red-400"
                >
                    <Trash2 className="w-5 h-5 text-red-400" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
