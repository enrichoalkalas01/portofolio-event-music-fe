"use client";

import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";

export function useProgressRouter() {
    const router = useRouter();
    const pathname = usePathname();

    const push = (href: string) => {
        if (href !== pathname) {
            NProgress.start();
        }
        router.push(href);
    };

    const replace = (href: string) => {
        if (href !== pathname) {
            NProgress.start();
        }
        router.replace(href);
    };

    return { ...router, push, replace };
}
