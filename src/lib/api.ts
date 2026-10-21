import { API_URL } from "./config";

export class ApiError extends Error {
    status: number;
    errors: unknown;

    constructor(message: string, status: number, errors?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

export interface ApiResponse<T> {
    status: string;
    statusCode: number;
    message: string;
    data: T;
    total?: number;
}

type Query = Record<string, string | number | boolean | undefined | null>;

interface ApiOptions extends Omit<RequestInit, "body"> {
    token?: string | null;
    query?: Query;
    body?: unknown;
}

export function buildQuery(query?: Query): string {
    if (!query) return "";
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null || value === "") continue;
        params.set(key, String(value));
    }
    const qs = params.toString();
    return qs ? `?${qs}` : "";
}

// Thin fetch wrapper for the backend: adds JSON headers, bearer token and
// throws ApiError (with the backend message) on non-2xx responses.
export async function api<T = unknown>(
    path: string,
    { token, query, body, headers, ...init }: ApiOptions = {},
): Promise<ApiResponse<T>> {
    const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}${buildQuery(query)}`;
    const isForm = typeof FormData !== "undefined" && body instanceof FormData;

    const response = await fetch(url, {
        ...init,
        headers: {
            ...(isForm ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(headers || {}),
        },
        body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
    });

    let payload: any = null;
    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        throw new ApiError(
            payload?.message || `Request failed (${response.status})`,
            response.status,
            payload?.errors,
        );
    }

    return payload as ApiResponse<T>;
}

export function getErrorMessage(error: unknown, fallback = "Terjadi kesalahan."): string {
    if (error instanceof ApiError) return error.message;
    const anyErr = error as any;
    return (
        anyErr?.response?.data?.message ||
        anyErr?.message ||
        fallback
    );
}
