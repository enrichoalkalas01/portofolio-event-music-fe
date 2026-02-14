"use client";

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
    const handlePrevButton = () => {
        if (currentPage > 1) {
            onChangePage(currentPage - 1);
        }
    };

    const handleNextButton = () => {
        if (currentPage < totalPages) {
            onChangePage(currentPage + 1);
        }
    };

    return (
        <>
            <Pagination className="w-auto">
                <PaginationContent className="w-auto flex gap-4">
                    <PaginationItem className="w-auto">
                        <Button
                            variant="outline"
                            className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={currentPage === 1 ? true : undefined}
                            disabled={currentPage === 1}
                            onClick={handlePrevButton}
                        >
                            <div className="text-xs flex items-center gap-1">
                                <ChevronLeftIcon
                                    className="-ms-1 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                                Previous
                            </div>
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="w-auto flex justify-center items-center text-sm">
                        {currentPage} / {totalPages}
                    </PaginationItem>
                    <PaginationItem className="w-auto">
                        <Button
                            variant="outline"
                            className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={
                                currentPage >= totalPages ? true : undefined
                            }
                            disabled={currentPage >= totalPages}
                            onClick={handleNextButton}
                        >
                            <div className="text-xs flex items-center gap-1">
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
