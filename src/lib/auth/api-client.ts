// lib/api-client.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
    const session: any = await getSession();

    if (session?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/login" });
        throw new Error("Session expired");
    }

    const accessToken = (session as any)?.token?.access_token;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired di backend
            const errorMessage = error.response?.data?.message || "";

            if (
                errorMessage.includes("jwt expired") ||
                errorMessage.includes("Unauthorized")
            ) {
                console.log("JWT expired on backend, forcing logout");
                signOut({ callbackUrl: "/login" });
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
