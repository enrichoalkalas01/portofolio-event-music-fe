"use client";

import React, { useCallback, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn/ui/form";
import { Button } from "@/components/shadcn/ui/button";
import {
    ImageIcon,
    XIcon,
    StarIcon,
    UploadIcon,
    GripVerticalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface ExtendedFileMetadata {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    file?: File;
    isPrimary?: boolean;
    order?: number;
    isExisting?: boolean;
    originalId?: string;
}

interface IFormRegularMultipleImageUpload {
    form: UseFormReturn<any>;
    name?: string;
    labelName?: string;
    description?: string;
    isDisable?: boolean;
    onChangesFiles?: (files: any) => void;
    maxFiles?: number;
    maxFileSize?: number;
    allowedTypes?: string[];
    showErrorState?: boolean;
    gridCols?: number;
    imageAspectRatio?: "square" | "landscape" | "portrait";
    showPrimarySelector?: boolean;
    enableReordering?: boolean;
    showFileNames?: boolean;
    showImageCount?: boolean;
    emptyStateText?: string;
    uploadButtonText?: string;
    propsFormItem?: Record<string, any>;
    propsFormLabel?: Record<string, any>;
    propsFormControl?: Record<string, any>;
    propsFormDescription?: Record<string, any>;
    propsFormMessage?: Record<string, any>;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function FormRegularMultipleImageUpload({
    form,
    name = "images",
    labelName,
    description,
    isDisable = false,
    onChangesFiles,
    maxFiles = 10,
    maxFileSize = 4 * 1024 * 1024,
    allowedTypes = ["image/*"],
    showErrorState = true,
    gridCols = 4,
    imageAspectRatio = "square",
    showPrimarySelector = true,
    enableReordering = true,
    showFileNames = false,
    showImageCount = true,
    emptyStateText,
    uploadButtonText,
    propsFormItem = {},
    propsFormLabel = {},
    propsFormControl = {},
    propsFormDescription = {},
    propsFormMessage = {},
}: IFormRegularMultipleImageUpload) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // ========================================================================
    // UTILITIES
    // ========================================================================

    const normalizeFieldValue = useCallback(
        (fieldValue: any): ExtendedFileMetadata[] => {
            // console.log("🔄 Normalizing field value:", fieldValue);

            if (!fieldValue) return [];

            if (!Array.isArray(fieldValue)) return [];

            const normalized = fieldValue
                .map((item, index) => {
                    // Check if it's already in correct format
                    if (
                        item &&
                        typeof item === "object" &&
                        item.id &&
                        item.name &&
                        item.url
                    ) {
                        return {
                            ...item,
                            order: item.order ?? index,
                            isPrimary: item.isPrimary ?? index === 0,
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            // console.log("✅ Normalized result:", normalized);
            return normalized;
        },
        []
    );

    const handleFileInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isDisable) return;

            const files = Array.from(event.target.files || []);
            if (files.length === 0) return;

            // console.log("📁 New files selected:", files);

            const currentFiles = normalizeFieldValue(form.getValues(name));
            const newFiles: ExtendedFileMetadata[] = files.map(
                (file, index) => ({
                    id: `new-${Date.now()}-${index}`,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file),
                    file: file,
                    isPrimary: currentFiles.length === 0 && index === 0,
                    order: currentFiles.length + index,
                    isExisting: false,
                })
            );

            const allFiles = [...currentFiles, ...newFiles];

            // Validate
            if (allFiles.length > maxFiles) {
                setValidationErrors([`Maximum ${maxFiles} images allowed`]);
                return;
            }

            setValidationErrors([]);
            form.setValue(name, allFiles);
            onChangesFiles?.(allFiles);

            // Reset input
            event.target.value = "";
        },
        [form, name, maxFiles, isDisable, normalizeFieldValue, onChangesFiles]
    );

    const handleRemoveFile = useCallback(
        (fileId: string) => {
            if (isDisable) return;

            const currentFiles = normalizeFieldValue(form.getValues(name));
            const updatedFiles = currentFiles
                .filter((file) => file.id !== fileId)
                .map((file, index) => ({
                    ...file,
                    order: index,
                    isPrimary:
                        file.isPrimary && index === 0 ? true : index === 0,
                }));

            form.setValue(name, updatedFiles);
            onChangesFiles?.(updatedFiles);
        },
        [form, name, isDisable, normalizeFieldValue, onChangesFiles]
    );

    const handleSetPrimary = useCallback(
        (targetId: string) => {
            if (isDisable) return;

            const currentFiles = normalizeFieldValue(form.getValues(name));
            const updatedFiles = currentFiles.map((file) => ({
                ...file,
                isPrimary: file.id === targetId,
            }));

            form.setValue(name, updatedFiles);
            onChangesFiles?.(updatedFiles);
        },
        [form, name, isDisable, normalizeFieldValue, onChangesFiles]
    );

    // ========================================================================
    // STYLING
    // ========================================================================

    const aspectRatioClasses = {
        square: "aspect-square",
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
    };

    const gridColsClasses = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
    };

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
                // console.log("🎯 Current field.value:", field.value);

                const displayFiles = normalizeFieldValue(field.value);
                const currentImagesCount = displayFiles.length;

                // console.log("📊 Display files:", displayFiles);

                return (
                    <FormItem {...propsFormItem}>
                        {labelName && (
                            <FormLabel {...propsFormLabel}>
                                {labelName}
                                {showImageCount && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({currentImagesCount}/{maxFiles})
                                    </span>
                                )}
                            </FormLabel>
                        )}

                        <FormControl {...propsFormControl}>
                            <div className="space-y-4">
                                {/* Upload Area */}
                                <div
                                    className={cn(
                                        "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                                        isDisable
                                            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                            : "border-gray-300 hover:border-gray-400 cursor-pointer"
                                    )}
                                    onClick={() =>
                                        !isDisable &&
                                        document
                                            .getElementById(
                                                `file-input-${name}`
                                            )
                                            ?.click()
                                    }
                                >
                                    <UploadIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600">
                                        {isDisable
                                            ? "View mode - upload disabled"
                                            : emptyStateText ||
                                              `${
                                                  uploadButtonText ||
                                                  "Click to upload images"
                                              } (max ${maxFiles})`}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Max{" "}
                                        {Math.round(
                                            maxFileSize / (1024 * 1024)
                                        )}
                                        MB per image
                                    </p>
                                </div>

                                {/* Hidden File Input */}
                                <input
                                    id={`file-input-${name}`}
                                    type="file"
                                    multiple
                                    accept={allowedTypes.join(",")}
                                    onChange={handleFileInput}
                                    className="sr-only"
                                    disabled={isDisable}
                                />

                                {/* Images Grid */}
                                {displayFiles.length > 0 && (
                                    <div
                                        className={cn(
                                            "grid gap-4",
                                            gridColsClasses[
                                                gridCols as keyof typeof gridColsClasses
                                            ] || "grid-cols-4"
                                        )}
                                    >
                                        {displayFiles.map((file, index) => (
                                            <div
                                                key={file.id}
                                                className={cn(
                                                    "relative group border rounded-lg overflow-hidden transition-all",
                                                    aspectRatioClasses[
                                                        imageAspectRatio
                                                    ],
                                                    file.isPrimary &&
                                                        "ring-2 ring-blue-500",
                                                    enableReordering &&
                                                        !isDisable &&
                                                        "cursor-move"
                                                )}
                                            >
                                                {file.url ? (
                                                    <img
                                                        crossOrigin="anonymous"
                                                        src={file.url}
                                                        alt={
                                                            file.name ||
                                                            `Image ${index + 1}`
                                                        }
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                )}

                                                {/* Controls Overlay */}
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
                                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {showPrimarySelector &&
                                                            !file.isPrimary &&
                                                            !isDisable && (
                                                                <Button
                                                                    type="button"
                                                                    size="icon"
                                                                    variant="secondary"
                                                                    className="h-6 w-6"
                                                                    onClick={() =>
                                                                        handleSetPrimary(
                                                                            file.id
                                                                        )
                                                                    }
                                                                    title="Set as primary"
                                                                >
                                                                    <StarIcon className="h-3 w-3" />
                                                                </Button>
                                                            )}

                                                        {!isDisable && (
                                                            <Button
                                                                type="button"
                                                                size="icon"
                                                                variant="destructive"
                                                                className="h-6 w-6"
                                                                onClick={() =>
                                                                    handleRemoveFile(
                                                                        file.id
                                                                    )
                                                                }
                                                                title="Remove image"
                                                            >
                                                                <XIcon className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                    </div>

                                                    {file.isPrimary && (
                                                        <div className="absolute top-2 left-2">
                                                            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                                Primary
                                                            </div>
                                                        </div>
                                                    )}

                                                    {showFileNames &&
                                                        file.name && (
                                                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded max-w-24 truncate">
                                                                    {file.name}
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </FormControl>

                        {description && (
                            <FormDescription {...propsFormDescription}>
                                {description}
                            </FormDescription>
                        )}

                        {validationErrors.length > 0 && showErrorState && (
                            <div className="space-y-1">
                                {validationErrors.map((error, index) => (
                                    <p
                                        key={index}
                                        className="text-sm text-destructive"
                                    >
                                        {error}
                                    </p>
                                ))}
                            </div>
                        )}

                        {fieldState.error && (
                            <FormMessage {...propsFormMessage}>
                                {fieldState.error.message}
                            </FormMessage>
                        )}
                    </FormItem>
                );
            }}
        />
    );
}
