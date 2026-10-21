"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { api, getErrorMessage } from "@/lib/api";

// Starts (or resumes) a checkout for an event and navigates to the checkout page.
export function useBuyTicket(eventId?: string) {
    const router = useRouter();
    const pathname = usePathname() ?? "/";
    const session: any = useSession();
    const accessToken: string | undefined = session?.data?.user?.token?.access_token;

    const [isLoading, setIsLoading] = useState(false);

    const buy = async () => {
        if (!eventId) return;

        if (!accessToken) {
            toast.info("Masuk terlebih dahulu untuk membeli tiket.");
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api<{ _id: string }>(`/transactions/${eventId}`, {
                method: "POST",
                token: accessToken,
            });
            router.push(`/checkout/${response.data._id}`);
        } catch (error) {
            toast.error(getErrorMessage(error, "Gagal memulai pembelian tiket."));
            setIsLoading(false);
        }
    };

    return { buy, isLoading, isAuthenticated: !!accessToken };
}
