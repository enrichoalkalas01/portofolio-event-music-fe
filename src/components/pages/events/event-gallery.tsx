"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/shadcn/ui/dialog";
import { cn } from "@/lib/utils";

interface EventGalleryProps {
    images: string[];
    title?: string;
}

export default function EventGallery({ images, title = "Galeri" }: EventGalleryProps) {
    const [index, setIndex] = useState<number | null>(null);
    const isOpen = index !== null;

    const prev = useCallback(
        () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
        [images.length],
    );
    const next = useCallback(
        () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
        [images.length],
    );

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, prev, next]);

    if (!images.length) return null;

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((src, i) => (
                    <button
                        key={src + i}
                        type="button"
                        onClick={() => setIndex(i)}
                        className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Buka gambar ${i + 1} dari ${images.length}`}
                    >
                        <img
                            src={src}
                            alt={`${title} ${i + 1}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                            <Expand className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                    </button>
                ))}
            </div>

            <Dialog open={isOpen} onOpenChange={(open) => !open && setIndex(null)}>
                <DialogContent
                    showCloseButton={false}
                    className="max-w-[95vw] sm:max-w-5xl w-full border-none bg-black/95 p-0 shadow-none gap-0 overflow-hidden"
                >
                    <DialogTitle className="sr-only">{title}</DialogTitle>
                    {index !== null && (
                        <div className="relative flex items-center justify-center min-h-[50vh] max-h-[85vh]">
                            <img
                                src={images[index]}
                                alt={`${title} ${index + 1}`}
                                className="max-h-[85vh] w-auto max-w-full object-contain select-none"
                            />

                            <button
                                type="button"
                                onClick={() => setIndex(null)}
                                className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                                aria-label="Tutup"
                            >
                                <X className="size-5" />
                            </button>

                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={prev}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                                        aria-label="Gambar sebelumnya"
                                    >
                                        <ChevronLeft className="size-6" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={next}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                                        aria-label="Gambar berikutnya"
                                    >
                                        <ChevronRight className="size-6" />
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setIndex(i)}
                                                aria-label={`Ke gambar ${i + 1}`}
                                                className={cn(
                                                    "h-1.5 rounded-full transition-all cursor-pointer",
                                                    i === index ? "w-6 bg-primary" : "w-2 bg-white/50 hover:bg-white/80",
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white tabular-nums">
                                        {index + 1} / {images.length}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
