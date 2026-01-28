"use client";

import { cn } from "@/lib/utils";

interface ISectionHeadTitle {
    title?: string;
    subTitle?: string;
    classname?: string;
    classnameTitle?: string;
    classnameSubTitle?: string;
}

export default function SectionHeadTitle({
    title = "Default Title",
    subTitle = "Check out this section.",
    classname = "w-full font-chakra",
    classnameTitle = "text-4xl font-bold italic",
    classnameSubTitle,
}: ISectionHeadTitle) {
    return (
        <>
            <div className={classname}>
                <h2 className={cn(classnameTitle)}>{title}</h2>
                <p className={cn(classnameSubTitle)}>{subTitle}</p>
            </div>
        </>
    );
}
