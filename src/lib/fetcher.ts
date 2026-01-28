// src/lib/fetcher.ts
import { unstable_cache } from "next/cache";

export type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Bisa semua metode HTTP
    headers?: HeadersInit; // Custom headers
    body?: any; // Data untuk request body
    queryParams?: Record<string, string | number | boolean>; // Query params opsional
    cache?: "no-store" | "force-cache" | number; // Opsi caching, default: no cache
    isServer?: boolean; // True jika dipanggil dari server-side
};

export const fetcher = async <T>(
    url: string,
    options?: FetchOptions,
): Promise<T> => {
    try {
        // Tambahkan query params jika ada
        const queryString = null;
        if (options?.queryParams) {
            options?.queryParams
                ? "?" +
                  new URLSearchParams(
                      options.queryParams as Record<string, string>,
                  ).toString()
                : "";
        }

        const requestUrl = `${url}${queryString || ""}`;

        // Fungsi fetch utama
        const fetchData = async () => {
            const response = await fetch(requestUrl, {
                method: options?.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers,
                },
                body: options?.body ? JSON.stringify(options.body) : undefined,
                // cache:
                //     options?.cache === "no-store" ? "no-store" : "force-cache",
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(
                    `Error ${response.status}: ${response.statusText} - ${
                        errorBody?.message || "Unknown Error"
                    }`,
                );
            }

            return response.json();
        };

        // Jika di server dan user mengaktifkan cache, gunakan `unstable_cache`
        if (options?.isServer && typeof options?.cache === "number") {
            const cachedFetcher = unstable_cache(
                fetchData,
                [`fetch-${requestUrl}`],
                {
                    revalidate: options.cache, // Cache di server selama waktu tertentu
                },
            );

            return cachedFetcher();
        }

        // Jika cache tidak diaktifkan atau di client, langsung fetch
        return fetchData();
    } catch (error: any) {
        // console.error("Fetch error:", error.message);
        throw new Error(error.message || "Something went wrong");
    }
};
