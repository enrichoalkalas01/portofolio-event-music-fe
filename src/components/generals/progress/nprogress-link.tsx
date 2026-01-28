"use client";

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type ProgressLinkProps = ComponentProps<typeof Link>;

export default function NPProgressLink({
    href,
    children,
    onClick,
    ...props
}: ProgressLinkProps) {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const targetPath = typeof href === "string" ? href : href.pathname;

        // Hanya start progress jika beda halaman
        if (targetPath !== pathname) {
            NProgress.start();
        }

        // Panggil onClick original jika ada
        onClick?.(e);
    };

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
}
