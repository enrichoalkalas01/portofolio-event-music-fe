"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to users profile page
        router.replace("/dashboard/users");
    }, [router]);

    return (
        <section className="w-full p-8 text-center">
            <p className="text-gray-500">Mengalihkan...</p>
        </section>
    );
}
