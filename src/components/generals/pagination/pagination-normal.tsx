import { usePagination } from "@/hooks/use-pagination";
import { useTableStore } from "../table/store/table-store";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/shadcn/ui/pagination";

type PaginationProps = {
    paginationItemsToDisplay?: number;
};

export default function Component({
    paginationItemsToDisplay = 5,
}: PaginationProps) {
    const { pagination, setPagination, totalData, pagePerSize } =
        useTableStore();

    // Konversi dari pageIndex (0-based) ke currentPage (1-based)
    const currentPage = pagination.pageIndex + 1;

    // Hitung total pages berdasarkan totalData dan pageSize
    const totalPages = Math.ceil(totalData / pagination.pageSize);

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    // Handler untuk perubahan halaman
    const handlePageChange = (page: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (page !== currentPage) {
            // Konversi kembali ke pageIndex (0-based) untuk store
            setPagination({
                pageIndex: page - 1,
                pageSize: pagination.pageSize,
            });
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                    <PaginationPrevious
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        aria-disabled={currentPage === 1 ? true : undefined}
                        onClick={
                            currentPage === 1
                                ? undefined
                                : handlePageChange(currentPage - 1)
                        }
                        style={{
                            cursor:
                                currentPage === 1 ? "not-allowed" : "pointer",
                        }}
                    />
                </PaginationItem>

                {/* Left ellipsis (...) */}
                {showLeftEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Page number links */}
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            onClick={handlePageChange(page)}
                            style={{ cursor: "pointer" }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Right ellipsis (...) */}
                {showRightEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next page button */}
                <PaginationItem>
                    <PaginationNext
                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                        aria-disabled={
                            currentPage === totalPages ? true : undefined
                        }
                        onClick={
                            currentPage === totalPages
                                ? undefined
                                : handlePageChange(currentPage + 1)
                        }
                        style={{
                            cursor:
                                currentPage === totalPages
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
