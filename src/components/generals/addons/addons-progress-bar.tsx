"use client";

import * as React from "react";

import { Progress } from "@/components/shadcn/ui/progress";

export function AddonsProgressBar() {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return <Progress value={0} className="w-full" />;
}
