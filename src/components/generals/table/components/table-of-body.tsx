"use client";

import React, { useState } from "react";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { InfoIcon } from "lucide-react";

// Components
import { TableBody, TableCell, TableRow } from "@/components/shadcn/ui/table";

// Components Pages
import { TableOfDragAlongCell } from "./table-of-drag-along-cell";

interface ITableOfBody {
    table: any;
    columns: any;
    columnOrder: any;
    statusData: "loading" | "success" | "error" | "no_data";
}

export function TableOfBody({
    table,
    columns,
    columnOrder,
    statusData = "loading",
}: ITableOfBody) {
    return (
        <>
            <TableBody>
                {table.getRowModel().rows?.length && statusData !== "error" ? (
                    table.getRowModel().rows.map((row: any, i: number) => (
                        <React.Fragment key={i}>
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="p-0"
                            >
                                {row.getVisibleCells().map((cell: any) => (
                                    <SortableContext
                                        key={cell.id}
                                        items={columnOrder}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        <TableOfDragAlongCell
                                            key={cell.id}
                                            cell={cell}
                                        />
                                    </SortableContext>
                                ))}
                            </TableRow>
                            {/* For Expandable Content */}
                            {row?.getIsExpanded() && (
                                <TableRow>
                                    <TableCell
                                        colSpan={row.getVisibleCells().length}
                                    >
                                        <div className="text-primary/80 flex items-start py-2">
                                            <span
                                                className="me-3 mt-0.5 flex w-7 shrink-0 justify-center"
                                                aria-hidden="true"
                                            >
                                                <InfoIcon
                                                    className="opacity-60"
                                                    size={16}
                                                />
                                            </span>
                                            <p className="text-sm">
                                                {row.original.note}
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns?.length}
                            className="h-24 text-center"
                        >
                            {statusData === "loading" && (
                                <div className="flex justify-center gap-3 items-center">
                                    <span className="loaderSpinner"></span>
                                    <span>Loading..</span>
                                </div>
                            )}
                            {statusData === "error" && (
                                <div className="flex justify-center gap-3 items-center">
                                    <span>No Result Data</span>
                                </div>
                            )}
                            {statusData === "no_data" && (
                                <div className="flex justify-center gap-3 items-center">
                                    <span>No Result Data</span>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </>
    );
}
