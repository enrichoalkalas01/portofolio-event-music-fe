import { useEffect, useState } from "react";

export const usePageChecker = () => {
    const [pageChecker, setPageChecker] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            if (pathname.includes("create")) {
                setPageChecker("create");
            } else if (pathname.includes("update")) {
                setPageChecker("update");
            } else {
                setPageChecker("others");
            }
        }
    }, []);

    return pageChecker;
};
