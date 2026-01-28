"use client";

import React, { useState, useEffect } from "react";

export const useResizeHandler = () => {
    const isClient = typeof window === "object";

    const [windowSize, setWindowSize] = useState({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isClient]);

    return windowSize;
};
