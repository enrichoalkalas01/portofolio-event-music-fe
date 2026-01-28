"use client";

// Library
import { CSSProperties } from "react";
import { Header, flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Icons
import { GripVerticalIcon } from "lucide-react";

// Components
import { TableHead } from "@/components/shadcn/ui/table";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

export const TableOfDraggableTableHeader = ({
    header,
    column,
}: {
    header: Header<any, unknown>;
    column: any;
}) => {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: header.column.id,
    });

    // this is cell style for forcing styling element
    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform),
        transition,
        whiteSpace: "nowrap",
        // width: header.column.getSize(), // For Automate Header Size
        zIndex: isDragging ? 1 : 0,
    };

    const isNotGrow = column?.isNotGrow;

    return (
        <TableHead
            ref={setNodeRef}
            className={cn(
                "before:bg-border relative h-10 before:absolute before:inset-y-0 before:start-0 before:w-px first:before:bg-transparent",
                header?.id === "expander" ? "p-0" : "",
                header?.id === "select" ? "p-0 w-[40px]" : ""
            )}
            style={style}
            aria-sort={
                header.column.getIsSorted() === "asc"
                    ? "ascending"
                    : header.column.getIsSorted() === "desc"
                    ? "descending"
                    : "none"
            }
        >
            {/* Wrapper Of Cell Draggable Header */}
            <div
                className={cn(
                    "flex items-center gap-0.5",
                    header?.id === "select" ? "justify-center" : "justify-start"
                )}
            >
                {/* Draggable Icon */}

                {header?.id !== "expander" &&
                    header?.id !== "select" &&
                    header?.id !== "actions" && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="-ml-2 size-7 shadow-none"
                            {...attributes}
                            {...listeners}
                            aria-label="Drag to reorder"
                        >
                            <GripVerticalIcon
                                className="opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                        </Button>
                    )}

                {/* Header Menu Of Cell */}
                {/* <span className="grow truncate"> */}
                <span className={cn("truncate", !isNotGrow && "grow")}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                </span>
            </div>
        </TableHead>
    );
};
