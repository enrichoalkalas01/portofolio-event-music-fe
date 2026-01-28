"use client";

// Library
import { CSSProperties, useEffect, useId, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Cell, flexRender } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { TableCell } from "@/components/shadcn/ui/table";

export const TableOfDragAlongCell = ({ cell }: { cell: any }) => {
    const { isDragging, setNodeRef, transform, transition } = useSortable({
        id: cell.column.id,
    });

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform),
        transition,
        // width: cell.column.getSize() || "100%",
        padding: 10,
        zIndex: isDragging ? 1 : 0,
    };

    const EditableCellStatus = cell.column.columnDef?.editable || false;

    return (
        <TableCell ref={setNodeRef} className="truncate px-2" style={style}>
            {EditableCellStatus
                ? flexRender(
                      cell.column.columnDef.editableCell,
                      cell.getContext()
                  )
                : flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
    );
};
