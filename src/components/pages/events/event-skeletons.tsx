import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function EventListSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="w-full flex flex-col gap-5">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="w-full rounded-2xl border border-border bg-card p-4 md:p-5 flex flex-col md:flex-row gap-5"
                >
                    <Skeleton className="w-full md:w-44 aspect-video md:aspect-square rounded-xl" />
                    <div className="flex-1 flex flex-col gap-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex md:flex-col gap-3 md:w-40">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function EventGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                    <Skeleton className="w-full aspect-[4/5] rounded-none" />
                    <div className="p-4 flex flex-col gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function EventDetailSkeleton() {
    return (
        <div className="w-full">
            <Skeleton className="w-full h-[320px] md:h-[420px] rounded-none" />
            <div className="w-full max-w-7xl mx-auto px-4 py-10 grid gap-10 lg:grid-cols-[1fr_360px]">
                <div className="flex flex-col gap-5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-80 w-full rounded-2xl" />
            </div>
        </div>
    );
}
