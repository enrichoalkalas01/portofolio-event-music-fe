"use client";

import { useSession } from "next-auth/react";

const ADMIN_ROLES = ["admin", "super_admin"];

// Convenience accessor for the backend bearer token stored in the next-auth session.
export function useAccessToken() {
    const session: any = useSession();
    const user = session?.data?.user;
    const accessToken: string | undefined = user?.token?.access_token;

    return {
        accessToken,
        user,
        role: (user?.role as string | undefined) || "user",
        isAdmin: ADMIN_ROLES.includes(user?.role),
        isAuthenticated: session?.status === "authenticated",
        isLoading: session?.status === "loading",
    };
}
