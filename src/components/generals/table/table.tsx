"use client";

// Library
import { useEffect, useId, useState } from "react";
import _ from "lodash";

// Components
import { Table } from "@/components/shadcn/ui/table";
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import {
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useReactTable,
    RowSelectionState,
} from "@tanstack/react-table";

// Components Pages
import {
    TableOfBody,
    TableOfHeader,
    TableOfFooter,
    TableOfTopSection,
} from "./components";

// Store
import { useTableStore } from "./store/table-store";

interface ITanstackTable {
    tableData: any[];
    columns: any;
    total: number;
    statusData?: "loading" | "success" | "error" | "no_data";
    topSectionStatus?: boolean;
    footerSectionStatus?: boolean;
    searchableColumns?: string[];
    useStore?: boolean;
    // ADDED: Callback untuk mengirim perubahan pagination ke parent
    onPaginationChange?: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
}

export default function TanstackTable({
    tableData = [],
    columns,
    total = 0,
    statusData = "loading",
    searchableColumns = [""],
    topSectionStatus = false,
    footerSectionStatus = false,
    useStore = true,
    onPaginationChange, // ADDED
}: ITanstackTable) {
    const {
        pagination,
        setPagination,
        totalData,
        setTotalData,
        setSelectedRow,
        setSorting: setSortingStore,
        sorting: sortingStore,
    } = useTableStore();

    const [data, setData] = useState<any[]>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnOrder, setColumnOrder] = useState<string[]>(
        columns.map((column: any) => column.id as string)
    );

    const [sorting, setSorting] = useState<SortingState>([]);

    // FIXED: Simplified init setup
    useEffect(() => {
        setTotalData(0);
    }, [setTotalData]);

    // FIXED: Simplified total data update
    useEffect(() => {
        if (totalData !== total) {
            setTotalData(total);
        }
    }, [total, totalData, setTotalData]);

    // FIXED: Simplified data update
    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    // ADDED: Notify parent when pagination changes
    useEffect(() => {
        if (onPaginationChange) {
            onPaginationChange(pagination);
        }
    }, [pagination, onPaginationChange]);

    // Setup Table
    const table = useReactTable({
        data: data,
        columns: columns,
        columnResizeMode: "onChange",

        // ADDED: Enable manual pagination for server-side
        manualPagination: true,
        pageCount: total > 0 ? Math.ceil(total / pagination.pageSize) : 0,

        state: {
            sorting,
            columnOrder,
            pagination: pagination,
            rowSelection: rowSelection,
        },

        getCoreRowModel: getCoreRowModel(), // core function tanstack table
        onColumnOrderChange: setColumnOrder,

        // Sort Setup
        getSortedRowModel: getSortedRowModel(), // sortable function tanstack table
        onSortingChange: setSorting, // every change of sorting from tanstack table is here
        enableSortingRemoval: false,

        // Row Setup
        getRowCanExpand: (row) => Boolean(row.original.note), // expandable function tanstack
        getExpandedRowModel: getExpandedRowModel(),

        // FIXED: Pagination Setup for server-side
        onPaginationChange: (updaterOrValue) => {
            if (typeof updaterOrValue === "function") {
                setPagination(updaterOrValue(pagination));
            } else {
                setPagination(updaterOrValue);
            }
        },

        // Row Selection
        onRowSelectionChange: setRowSelection,
    });

    // Update selected rows
    useEffect(() => {
        setSelectedRow(table.getSelectedRowModel().rows);
    }, [rowSelection, setSelectedRow]);

    useEffect(() => {
        if (sorting) {
            let mappedData: any = {
                field: sorting[0]?.id,
                value: sorting[0]?.desc ? "desc" : "asc",
            };

            setSortingStore(mappedData);
        }
    }, [sorting, setSortingStore]);

    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string);
                const newIndex = columnOrder.indexOf(over.id as string);
                return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
            });
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );

    return (
        <div>
            {/* Activated Top Sections */}
            {topSectionStatus && (
                <div className="w-full pt-2 pb-4">
                    <TableOfTopSection
                        table={table}
                        searchableColumns={searchableColumns}
                        useStore={useStore}
                    />
                </div>
            )}

            <div className="bg-background overflow-hidden rounded-md border">
                <DndContext
                    id={useId()}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                >
                    <Table>
                        <TableOfHeader
                            table={table}
                            columnOrder={columnOrder}
                            columns={columns}
                        />
                        <TableOfBody
                            table={table}
                            columnOrder={columnOrder}
                            columns={columns}
                            statusData={statusData}
                        />
                    </Table>
                </DndContext>
            </div>

            {/* Activated Footer Sections */}
            {footerSectionStatus && (
                <div className="px-2 py-4">
                    <TableOfFooter table={table} />
                </div>
            )}
        </div>
    );
}
