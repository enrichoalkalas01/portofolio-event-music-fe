"use client";

import Marquee from "react-fast-marquee";

interface IMarqueeContainer {
    children?: React.ReactNode;
    props?: any;
}

export default function MarqueeContainer({
    children = "I can be a React component, multiple React components, or just some text.",
}: IMarqueeContainer) {
    return (
        <>
            <Marquee
                autoFill={true}
                className="overflow-hidden relative flex h-full items-center justify-center"
            >
                {children}
            </Marquee>
        </>
    );
}
