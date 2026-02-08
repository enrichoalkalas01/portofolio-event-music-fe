"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to event detail page since users cannot update tickets
        router.back();
    }, [router]);

    return (
        <section className="w-full p-8 text-center">
            <p className="text-gray-500">Mengalihkan...</p>
        </section>
    );
}
