"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status }: any = useSession();
    const router = useRouter();
    const pathname = usePathname() ?? "/";

    useEffect(() => {
        if (session?.error === "TokenExpired") {
            signOut({ callbackUrl: "/login", redirect: true });
            return;
        }
        if (status === "unauthenticated") {
            router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [session, status, router, pathname]);

    if (status === "loading" || status === "unauthenticated" || session?.error === "TokenExpired") {
        return (
            <div className="flex items-center justify-center min-h-screen text-muted-foreground gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>
                    {session?.error === "TokenExpired"
                        ? "Sesi berakhir, mengarahkan ke halaman masuk..."
                        : "Memuat..."}
                </span>
            </div>
        );
    }

    return <>{children}</>;
}
