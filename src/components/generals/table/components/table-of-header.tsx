"use client";

// Library
import { TableHeader, TableRow } from "@/components/shadcn/ui/table";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components Pages
import { TableOfDraggableTableHeader } from "./table-of-dragable-header";

interface ITableOfHeader {
    table?: any;
    columnOrder?: any;
    columns?: any;
}

export function TableOfHeader({ table, columnOrder, columns }: ITableOfHeader) {
    return (
        <>
            <TableHeader className="">
                {table.getHeaderGroups().map((headerGroup: any) => {
                    return (
                        // <TableRow key={headerGroup.id} className="bg-muted/50">
                        <TableRow key={headerGroup.id} className="">
                            <SortableContext
                                items={columnOrder}
                                strategy={horizontalListSortingStrategy}
                            >
                                {headerGroup.headers.map(
                                    (header: any, i: number) => {
                                        return (
                                            <TableOfDraggableTableHeader
                                                key={header.id}
                                                header={header}
                                                column={columns[i]}
                                            />
                                        );
                                    }
                                )}
                            </SortableContext>
                        </TableRow>
                    );
                })}
            </TableHeader>
        </>
    );
}
