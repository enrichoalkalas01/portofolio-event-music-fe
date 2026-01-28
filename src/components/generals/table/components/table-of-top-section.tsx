"use client";

// Components Pages
import { TableOfTopSectionSearch } from "./table-of-top-section-search";
import { TableOfTopSectionStatus } from "./table-of-top-section-status";
import { TableOfTopSectionVisibility } from "./table-of-top-section-visibility";

// Interfaces
interface ITableOfTopSection {
    table: any;
    searchableColumns?: string[];
    useStore?: boolean;
}

export function TableOfTopSection({
    table,
    searchableColumns = [],
    useStore = true,
}: ITableOfTopSection) {
    return (
        <>
            <div className="w-full flex gap-4">
                <div className="w-full">
                    <TableOfTopSectionSearch
                        table={table}
                        searchableColumns={searchableColumns}
                        useStore={useStore}
                    />
                </div>
                <div className="w-full flex gap-2">
                    {/* <TableOfTopSectionStatus table={table} /> */}
                    <TableOfTopSectionVisibility table={table} />
                </div>
            </div>
        </>
    );
}
