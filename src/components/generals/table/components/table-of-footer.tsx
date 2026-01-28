"use client";

import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/shadcn/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/shadcn/ui/pagination";

import {
    ChevronFirstIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronLastIcon,
} from "lucide-react";

import { useTableStore } from "../store/table-store";

interface ITableOfFooter {
    table: any;
    id?: any;
}

export const TableOfFooter = ({ table, id }: ITableOfFooter) => {
    const { pagination, pagesData, totalData, setPagination } = useTableStore();

    const handlePageSize = (value: string) => {
        setPagination({
            pageIndex: 0, // Reset to first page when changing page size
            pageSize: Number(value) || 50,
        });
    };

    // FIXED: Simplified pagination handlers
    const handlePrevButton = () => {
        if (table.getCanPreviousPage()) {
            setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            });
        }
    };

    const handleNextButton = () => {
        if (table.getCanNextPage()) {
            setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            });
        }
    };

    const handleFirstButton = () => {
        setPagination({
            pageIndex: 0,
            pageSize: pagination.pageSize,
        });
    };

    const handleLastButton = () => {
        const lastPageIndex = table.getPageCount() - 1;
        setPagination({
            pageIndex: Math.max(0, lastPageIndex),
            pageSize: pagination.pageSize,
        });
    };

    // Calculate display values
    const currentPageSize = pagination.pageSize;
    const currentPageIndex = pagination.pageIndex;
    const startItem =
        totalData > 0 ? currentPageIndex * currentPageSize + 1 : 0;
    const endItem = Math.min(
        (currentPageIndex + 1) * currentPageSize,
        totalData
    );

    return (
        <>
            <div className="flex items-center justify-between gap-8">
                {/* Results per page */}
                <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="max-sm:sr-only">
                        Rows per page
                    </Label>
                    <Select
                        value={`${currentPageSize}`}
                        onValueChange={handlePageSize}
                    >
                        <SelectTrigger
                            id={id}
                            className="w-fit whitespace-nowrap"
                        >
                            <SelectValue placeholder="Select number of results" />
                        </SelectTrigger>
                        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                            {pagesData.map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={pageSize.toString()}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* FIXED: Page number information with proper calculation */}
                <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                    <p
                        className="text-muted-foreground text-sm whitespace-nowrap"
                        aria-live="polite"
                    >
                        <span className="text-foreground">
                            {startItem}-{endItem}
                        </span>{" "}
                        of{" "}
                        <span className="text-foreground">
                            {totalData?.toLocaleString() || 0}
                        </span>
                    </p>
                </div>

                {/* Pagination buttons */}
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* First page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={handleFirstButton}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to first page"
                                >
                                    <ChevronFirstIcon
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Button>
                            </PaginationItem>

                            {/* Previous page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={handlePrevButton}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to previous page"
                                >
                                    <ChevronLeftIcon
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Button>
                            </PaginationItem>

                            {/* Next page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={handleNextButton}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to next page"
                                >
                                    <ChevronRightIcon
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Button>
                            </PaginationItem>

                            {/* Last page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={handleLastButton}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to last page"
                                >
                                    <ChevronLastIcon
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
};
