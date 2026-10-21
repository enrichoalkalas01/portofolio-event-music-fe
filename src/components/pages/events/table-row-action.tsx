"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import ConfirmDialog from "@/components/generals/confirm-dialog";
import { api, getErrorMessage } from "@/lib/api";
import { useAccessToken } from "@/hooks/use-access-token";

export default function TableRowAction({
    table,
    row,
}: {
    table: any;
    row: any;
}) {
    const router = useRouter();
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const id = row?.original?._id;
    const title = row?.original?.title;

    const handleDelete = async () => {
        try {
            await api(`/events/${id}`, { method: "DELETE", token: accessToken });
            queryClient.invalidateQueries({ queryKey: ["admin-events-list"] });
            toast.success(`Event "${title}" berhasil dihapus`);
        } catch (error) {
            toast.error(getErrorMessage(error, "Gagal menghapus event"));
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Aksi">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/admin/events/${id}`)} className="cursor-pointer">
                        <Eye /> Lihat
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(`/events/${id}`, "_blank")} className="cursor-pointer">
                        <ExternalLink /> Buka halaman publik
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/admin/events/${id}/update`)} className="cursor-pointer">
                        <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setConfirmOpen(true)}
                        className="cursor-pointer text-rose-400 focus:text-rose-400"
                    >
                        <Trash2 className="text-rose-400" /> Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Hapus event ini?"
                description={
                    <>
                        Event <span className="font-semibold text-foreground">{title}</span> akan
                        dihapus permanen. Event yang sudah memiliki transaksi tidak bisa dihapus,
                        ubah statusnya menjadi Dibatalkan.
                    </>
                }
                confirmLabel="Hapus"
                destructive
                onConfirm={handleDelete}
            />
        </>
    );
}
