// app/components/AuthGuard.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status }: any = useSession();
    const router = useRouter();

    useEffect(() => {
        // Jika session ada error TokenExpired, auto logout
        if (session?.error === "TokenExpired") {
            console.log("🔴 Token expired, logging out...");

            // Auto logout dan redirect ke login
            signOut({
                callbackUrl: "/login",
                redirect: true,
            });
        }
    }, [session, router]);

    // Jika sedang loading
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    // Jika tidak ada session, redirect ke login
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    // Jika ada error, tampilkan loading sambil redirect
    if (session?.error === "TokenExpired") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Session expired, redirecting to login...</div>
            </div>
        );
    }

    // Session valid, tampilkan content
    return <>{children}</>;
}
