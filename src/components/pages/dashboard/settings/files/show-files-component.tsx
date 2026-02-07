"use client";

import { useEffect, useState, useCallback } from "react";
import ShowFilesItem from "./show-files-item";

interface ISelectedFile {
    status: boolean;
    file: any;
}

interface IShowFilesComponentSelection {
    totalSelected: number;
    selectedItems: any[];
    selectedFiles: ISelectedFile[];
    isAllSelected: boolean;
}

interface IShowFilesComponentProps {
    readonly files: any[];
    readonly checkBoxStatus?: boolean;
    readonly tootlgeStatus?: boolean;
    readonly fullMetaData?: boolean;
    readonly onSelectionChange?: (
        selection: IShowFilesComponentSelection,
    ) => void;
    readonly layout?: "grid" | "list";
    readonly gridCols?: number;
}

const baseUrlImage =
    "https://minio-api.enrichoalkalas.my.id/portofolio-event-music/";

export default function ShowFilesComponent({
    files,
    checkBoxStatus = false,
    tootlgeStatus = false,
    fullMetaData = false,
    onSelectionChange,
    layout = "grid",
    gridCols = 4,
}: IShowFilesComponentProps) {
    const [selectedMap, setSelectedMap] = useState<Map<string, ISelectedFile>>(
        new Map(),
    );

    // Handle individual file selection
    const handleFileSelection = useCallback((fileData: ISelectedFile) => {
        setSelectedMap((prevMap) => {
            const newMap = new Map(prevMap);
            const fileKey = fileData.file.name;

            if (fileData.status) {
                newMap.set(fileKey, fileData);
            } else {
                newMap.delete(fileKey);
            }

            return newMap;
        });
    }, []);

    // Effect untuk trigger callback ketika selection berubah
    useEffect(() => {
        if (onSelectionChange) {
            const selectedArray = Array.from(selectedMap.values());
            const selectionData: IShowFilesComponentSelection = {
                totalSelected: selectedArray.length,
                selectedItems: selectedArray.map((item) => item.file),
                selectedFiles: selectedArray,
                isAllSelected:
                    selectedArray.length === files.length && files.length > 0,
            };

            onSelectionChange(selectionData);
        }
    }, [selectedMap, files.length, onSelectionChange]);

    // Select All functionality
    const handleSelectAll = useCallback(() => {
        setSelectedMap((prevMap) => {
            if (prevMap.size === files.length && files.length > 0) {
                // Deselect all
                return new Map();
            } else {
                // Select all
                const newMap = new Map<string, ISelectedFile>();
                files.forEach((file) => {
                    newMap.set(file.name, {
                        status: true,
                        file: file,
                    });
                });
                return newMap;
            }
        });
    }, [files]);

    // Clear selection
    const handleClearSelection = useCallback(() => {
        setSelectedMap(new Map());
    }, []);

    // Get current selection state
    const getSelectionState = useCallback((): IShowFilesComponentSelection => {
        const selectedArray = Array.from(selectedMap.values());
        return {
            totalSelected: selectedArray.length,
            selectedItems: selectedArray.map((item) => item.file),
            selectedFiles: selectedArray,
            isAllSelected:
                selectedArray.length === files.length && files.length > 0,
        };
    }, [selectedMap, files.length]);

    const gridLayoutClass =
        layout === "grid"
            ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-4`
            : "flex flex-col gap-3";

    return (
        <section className="w-full">
            {/* Selection Info Bar */}
            {checkBoxStatus && selectedMap.size > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">
                        {selectedMap.size} file
                        {selectedMap.size !== 1 ? "s" : ""} selected
                    </span>
                    <button
                        onClick={handleClearSelection}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Select All Button */}
            {/* {checkBoxStatus && files.length > 0 && (
                <div className="mb-4 flex gap-2">
                    <button
                        onClick={handleSelectAll}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                    >
                        {selectedMap.size === files.length && files.length > 0
                            ? "Deselect All"
                            : "Select All"}
                    </button>
                </div>
            )} */}

            {/* Files Grid/List */}
            <div className={gridLayoutClass}>
                {files && files.length > 0 ? (
                    files.map((file: any, index: number) => {
                        return (
                            <ShowFilesItem
                                key={index}
                                file={file}
                                checkBoxStatus={checkBoxStatus}
                                tootlgeStatus={tootlgeStatus}
                                fullMetaData={fullMetaData}
                                onChangeSelected={handleFileSelection}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No files found</p>
                    </div>
                )}
            </div>
        </section>
    );
}

// Export helper hook untuk mengakses selection state dari parent component
export function useShowFilesSelection() {
    const [selection, setSelection] = useState<IShowFilesComponentSelection>({
        totalSelected: 0,
        selectedItems: [],
        selectedFiles: [],
        isAllSelected: false,
    });

    return {
        selection,
        setSelection,
    };
}
