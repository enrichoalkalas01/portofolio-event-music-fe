"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ProvidersThemes({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    // Tambahkan state untuk menangani hydration
    const [mounted, setMounted] = React.useState(false);

    // Gunakan useEffect untuk menandai komponen telah di-mount pada client-side
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Jika belum di-mount, kembalikan children saja untuk menghindari hydration mismatch
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <>
            <NextThemesProvider
                attribute="class"
                defaultTheme="light"
                themes={["red", "dark-red", "light", "dark"]}
                disableTransitionOnChange
                {...props}
            >
                {children}
            </NextThemesProvider>
        </>
    );
}
