import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";

export default function NotFound() {
    return (
        <main className="flex-1 w-full min-h-[70vh] flex items-center justify-center px-4">
            <div className="flex flex-col items-center text-center gap-5 max-w-md">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Compass className="size-8" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
                <h1 className="text-3xl font-bold tracking-tight">Halaman tidak ditemukan</h1>
                <p className="text-muted-foreground">
                    Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.
                </p>
                <div className="flex gap-3">
                    <Button asChild>
                        <Link href="/">Ke Beranda</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/events">Jelajahi Event</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
