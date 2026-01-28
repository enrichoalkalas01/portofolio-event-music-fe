"use client";

import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/shadcn/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface IPaginationProps {
    currentPage?: number;
    totalPages?: number;
    onChangePage?: (page: number) => void;
}

export default function PaginationSimple({
    currentPage = 1,
    totalPages = 0,
    onChangePage = (page: number) => {},
}: IPaginationProps) {
    const [Page, setPage] = useState<number>(currentPage);

    const handlePrevButton = () => {
        setPage((prev) => prev - 1);
        onChangePage(Page - 1);
    };

    const handleNextButton = () => {
        setPage((prev) => prev + 1);
        onChangePage(Page + 1);
    };

    return (
        <>
            <Pagination className="w-auto">
                <PaginationContent className="w-auto flex gap-4">
                    <PaginationItem className="w-auto">
                        <Button
                            variant="outline"
                            className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={Page === 1 ? true : undefined}
                            role={Page === 1 ? "link" : undefined}
                            asChild
                            disabled={Page === 1}
                            onClick={handlePrevButton}
                        >
                            <div className="text-xs">
                                <ChevronLeftIcon
                                    className="-ms-1 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                                Previous
                            </div>
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="w-auto flex justify-center items-center">
                        {Page}
                    </PaginationItem>
                    <PaginationItem className="w-auto">
                        <Button
                            variant="outline"
                            className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={
                                Page >= totalPages ? true : undefined
                            }
                            role={Page >= totalPages ? "link" : undefined}
                            asChild
                            onClick={handleNextButton}
                        >
                            <div className="text-xs">
                                Next
                                <ChevronRightIcon
                                    className="-me-1 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                            </div>
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
