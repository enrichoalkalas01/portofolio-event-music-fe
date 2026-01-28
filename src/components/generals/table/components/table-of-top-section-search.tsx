"use client";

// Library
import { useRef, useId, useEffect } from "react";

// Store
import { useTableStore } from "../store/table-store"; // Adjust path as needed

// Components
import { Input } from "@/components/shadcn/ui/input";

// Icons
import { ListFilterIcon, CircleXIcon } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";
import { useDebounceFunction } from "@/hooks/use-debounce";

interface ITableOfTopSectionSearch {
    table: any;
    searchableColumns?: string[]; // Array of column IDs that can be searched
    placeholder?: string;
    className?: string;
    useStore?: boolean; // Option to use store or local state
}

export function TableOfTopSectionSearch({
    table,
    searchableColumns = ["search"], // Default to "search" column for backward compatibility
    placeholder = "Search...",
    className,
    useStore = true, // Default to using store
}: ITableOfTopSectionSearch) {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    // Store state
    const { searchValue, setSearchValue, clearSearch } = useTableStore();

    // Get the first available searchable column
    const getSearchColumn = () => {
        for (const columnId of searchableColumns) {
            const column = table.getColumn(columnId);
            if (column) return column;
        }
        return null;
    };

    const searchColumn = getSearchColumn();

    // Use store value or table filter value based on useStore prop
    const currentFilterValue = useStore
        ? searchValue
        : searchColumn?.getFilterValue() ?? "";

    // Generate dynamic placeholder based on searchable columns
    const getDynamicPlaceholder = () => {
        if (placeholder !== "Search...") return placeholder;

        const availableColumns = searchableColumns
            .filter((columnId) => table.getColumn(columnId))
            .map((columnId) => {
                // Convert column ID to readable format (e.g., "firstName" -> "First Name")
                return columnId
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
            });

        if (availableColumns.length === 0) return "Search...";
        if (availableColumns.length === 1)
            return `Filter by ${availableColumns[0].toLowerCase()}...`;
        if (availableColumns.length === 2)
            return `Filter by ${availableColumns
                .join(" or ")
                .toLowerCase()}...`;

        const lastColumn = availableColumns.pop();
        return `Filter by ${availableColumns
            .join(", ")
            .toLowerCase()}, or ${lastColumn?.toLowerCase()}...`;
    };

    // Debounced function to update table filter
    const debouncedSetFilter = useDebounceFunction((value: string) => {
        if (!useStore && searchColumn) {
            if (searchableColumns.length > 1) {
                searchColumn.setFilterValue(value);
            } else {
                searchColumn.setFilterValue(value);
            }
        }
    }, 300);

    // Sync store value with table filter when using store
    useEffect(() => {
        if (useStore && searchColumn) {
            debouncedSetFilter(searchValue);
        }
    }, [searchValue, useStore, searchColumn, debouncedSetFilter]);

    // If no searchable column is found, don't render the component
    if (!searchColumn) {
        console.warn(
            `TableOfTopSectionSearch: None of the specified columns [${searchableColumns.join(
                ", "
            )}] exist in the table`
        );
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (useStore) {
            // Update store value
            setSearchValue(value);
        } else {
            // Update table filter directly
            if (searchableColumns.length > 1) {
                searchColumn.setFilterValue(value);
            } else {
                searchColumn.setFilterValue(value);
            }
        }
    };

    const handleClearFilter = () => {
        if (useStore) {
            // Clear store value
            clearSearch();
        } else {
            // Clear table filters directly
            if (searchableColumns.length > 1) {
                searchableColumns.forEach((columnId) => {
                    const column = table.getColumn(columnId);
                    column?.setFilterValue("");
                });
            } else {
                searchColumn.setFilterValue("");
            }
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={cn("relative", className)}>
            {/* Input */}
            <Input
                id={`${id}-input`}
                ref={inputRef}
                className={cn(
                    "peer min-w-60 ps-9",
                    Boolean(currentFilterValue) && "pe-9"
                )}
                value={currentFilterValue as string}
                onChange={handleInputChange}
                placeholder={getDynamicPlaceholder()}
                type="text"
                aria-label={getDynamicPlaceholder()}
            />

            {/* Filter Icon */}
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ListFilterIcon size={16} aria-hidden="true" />
            </div>

            {/* Clear Button */}
            {Boolean(currentFilterValue) && (
                <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Clear filter"
                    onClick={handleClearFilter}
                >
                    <CircleXIcon size={16} aria-hidden="true" />
                </button>
            )}
        </div>
    );
}
